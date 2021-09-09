import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import {operations} from "../../interface/api"

class UserController extends BaseController {
  async getUsers(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var query = {};

    if (req.query.club){
      query["clubMembership.clubName"] = req.query.club;
    }
    var result = await userRepo.getUsers(query);


//     const cursor = db.collection('inventory').find({
//                      tags: 'red'
//                    });
    
    // if(club != null) {
    //   result = result.filter(
    //     function( user ) {
    //       return ( user.clubMembership.name == club );
    //     }
    //   );
    // }

    res.status(200).json(result);  

    //@TODO still neeed to implement filtering by clubs :(

    // var club = req.query.club;

    // if (club != null) {
    //   console.log('Getting By Clubs');
    //   console.log('Query<Club>: ' + club);
    // } else {
    //   console.log('Getting All');
    // }

    // res.status(200).json([{ uuid: 'SomeClub' }]);
  }

  async getUserByID(req: Request, res: Response) {
    var id = req.params.id.toString();
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    const result = await userRepo.getByID(id);
    
    console.log(id);

    res.status(200).json(result);
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

    var id = req.params.id.toString();
    console.log(id);

    console.log(req.query)

    var name = req.query.firstname.toString();
    console.log(name);

    userRepo.modifyUser(id, "firstName", name);

    res.status(200).json();
  }

  async deleteUser(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var id = req.params.id.toString();
    console.log(id);

    userRepo.deleteUser(id);

    res.status(200).json();
  }
}

export { UserController };
