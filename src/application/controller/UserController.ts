import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';

class UserController extends BaseController {
  async getUsers(req: Request, res: Response) {
    var club = req.query.club;

    if (club != null){
      console.log("Getting By Clubs");
      console.log("Query<Club>: " + club);
    } else { 
      console.log("Getting All");
    }

    res.status(200).json([{ uuid: "SomeClub" }]);
  }

  async getUserByID(req: Request, res:Response){
    var id = req.params.id
    console.log(id)

    res.status(200).json([{ uuid: "SomeClub2" }]);
  }
  
  async createUser(req: Request, res:Response) {
    const data = req.body;
    console.log(data);

    res.status(201).json(data);
  }

  async modifyUser(req: Request, res:Response){
    const data = req.body;
    console.log(data);
  }

  async deleteUser(req: Request, res: Response){
    
  }

}

export { UserController };
