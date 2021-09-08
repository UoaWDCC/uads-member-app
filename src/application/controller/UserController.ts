import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { UserRepository } from '../../infrastructure/repository/UserRepository';

class UserController extends BaseController {
  async getUsers(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    const result = await userRepo.getAllUsers();

    res.status(200).json(result);       //@TODO doesn't check for uuid field :(

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

  async createUser(req: Request, res: Response) {
    const userDetails = req.body;
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();
    userRepo.createUser(userDetails);

    // if you want to return the user created
    // const uuid = req.body.uuid;
    // const result = await userRepo.getByID(uuid);
    // res.status(201).json(result);

    res.status(201).json([ "Created!" ]);
  }

  async modifyUser(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var id = req.params.id.toString();
    console.log(id);

    var name = req.query.name.toString();
    console.log(name);

    userRepo.modifyUser(id, "firstName", name);

    res.status(200).json(null);
  }

  async deleteUser(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const userRepo = new UserRepository(mongoAdapter, 'userDetails');
    await userRepo.isConnected();

    var id = req.params.id.toString();
    console.log(id);

    userRepo.deleteUser(id);

    res.status(200).json(null);
  }
}

export { UserController };
