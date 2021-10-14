import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { EventRepository } from '../../infrastructure/repository/EventRepository';

class DiscountController extends BaseController {
  async getEvents(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const eventRepo = new EventRepository(mongoAdapter, 'eventDetails');
    await eventRepo.isConnected();

    const result = await eventRepo.list();

    res.status(200).json(result);
  }
}

export { DiscountController };
