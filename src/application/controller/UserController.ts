import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';

class UserController extends BaseController {
  async getUsers(req: Request, res: Response) {
    console.log("Query<Club>: " + req.query.club);
    res.status(200).json([{ uuid: "SomeClub" }]);
  }
}

export { UserController };
