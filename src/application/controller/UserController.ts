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


}

export { UserController };
