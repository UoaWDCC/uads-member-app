import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { operations } from '../../interface/api';

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
}

export { UserController };
