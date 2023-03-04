import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { UserRepository } from '../../infrastructure/repository/UserRepository';

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SPREADSHEET_ID = "1VINiGshMiwPwxeS_U7JTii-mmnLvd-woOhB3y723hLY";

  /**
   * Reads previously authorized credentials from the save file.
   *
   * @return {Promise<OAuth2Client|null>}
   */
  async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  /**
   * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
   *
   * @param {OAuth2Client} client
   * @return {Promise<void>}
   */
  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  /**
   * Load or request or authorization to call APIs.
   *
   */
  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

  /**
   * Gets cell values from a Spreadsheet.
   * @param {string} spreadsheetId The spreadsheet ID.
   * @param {string} range The sheet range.
   * @return {obj} spreadsheet information
   */
  async function getValues(auth) {

    const sheets = google.sheets({version: 'v4', auth});

    try {
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:A',
      });
      return result;
    } catch (err) {
      // TODO (developer) - Handle exception
      throw err;
    }
  }

class UserController extends BaseController {
  async getUsers(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var query = {};

    // const queryParams = req.query;
    // for ( const [key, value] of Object.entries(queryParams)) {
    //   query[key] = value;
    // }

    // get all by club
    if (req.query.club) {
      query['clubMembership.name'] = req.query.club;
    } else {
      query['clubMembership.name'] = 'UADS';
    }

    // get all by university
    if (req.query.university) {
      query['university'] = req.query.university;
    }

    // get all by gradlevel
    if (req.query.gradlevel) {
      query['gradLevel.type'] = req.query.gradlevel;
    }

    const result = await userRepo.getUsers(query);

    res.status(200).json(result);
  }

  async getUserByUpi(req: Request, res: Response) {
    var upi = req.params.upi.toString();
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    const result = await userRepo.getByUpi(upi);

    if (result != null) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  }

  //generate UUID and pass into request body
  async createUser(req: Request, res: Response) {
    const userDetails = req.body;
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();
    userRepo.createUser(userDetails);

    res.status(201).json();
  }

  async modifyUser(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var upi = req.params.upi.toString();

    var query = {};

    const queryParams = req.query;
    /*
       for ( const [key, value] of Object.entries(queryParams)) {
         if (key == "notificationsON"){
           query[key] = value;
         }
       }
     */

    query['modified'] = Date.now();

    // modify firstname
    if (req.query.firstname) {
      query['firstName'] = req.query.firstname;
    }

    //modify last name
    if (req.query.lastname) {
      query['lastName'] = req.query.lastname;
    }

    //modify university
    if (req.query.university) {
      query['university'] = req.query.university;
    }

    //modify gradlevel
    if (req.query.gradlevel) {
      query['gradLevel.type'] = req.query.gradlevel;
    }

    //modify club
    // if (req.query.club){
    //   query["clubMembership.name"] = req.query.club;
    // }

    //modify notifications on
    if (req.query.notificationson) {
      if (req.query.notificationson == 'true') {
        query['notificationsON'] = true;
      } else {
        query['notificationsON'] = false;
      }
    }

    const status = await userRepo.modifyUser(upi, query);
    if (!status) {
      res.status(404).json();
    } else {
      res.status(200).json();
    }
  }

  async deleteUser(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var upi = req.params.upi.toString();

    const numDeleted = await userRepo.deleteUser(upi);

    if (numDeleted == 0) {
      res.status(404).json();
    } else {
      res.status(200).json();
    }
  }

  async getUserEligibility(req: Request, res: Response) {
    const upi = req.params.upi.toString().toLocaleLowerCase()
    let returnVal = {
      eligible: false
    }
    await authorize().then(getValues).then(
      (result) => {
        const rows = result.data.values;
        if (!rows || rows.length === 0) {
          console.log('No data found.');
          return;
        }
        rows.forEach((row) => {
          if (upi === row[0].toString().toLocaleLowerCase()) {
            console.log("found it!")
            returnVal.eligible = true
          }
        });
      }
    ).catch(console.error);
      if (returnVal != null) {
        res.status(200).json(returnVal);
      } else {
        res.status(404).json();
      }
    
  }
}

export { UserController };
