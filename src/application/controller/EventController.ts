import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';

class EventController extends BaseController {
  async getEvents(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

export { EventController };
