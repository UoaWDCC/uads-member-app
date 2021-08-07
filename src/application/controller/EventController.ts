import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';

class EventController extends BaseController {
  async getEvents(req: Request, res: Response) {
    res.status(200).json([{ name: 'hello world' }]);
  }
}

export { EventController };
