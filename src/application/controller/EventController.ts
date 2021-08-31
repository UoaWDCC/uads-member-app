import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

class EventController extends BaseController {
  async getEvents(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    res.status(200).json([
      {
        uuid: '457eb090-ff13-4b9f-a6d1-33595e77f753',
        date: '2000-91-22',
        name: 'Event Name',
        desc: 'Event Description',
        'location:': {
          building: '405',
          room: '999',
          'description:': 'Description of location',
        },
        imagePath:
          'https://images.unsplash.com/photo-1599785209796-786432b228bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
        attendanceCap: '100',
        sponsor: 'WDCC',
        url: 'https://wdcc.co.nz/',
      },
    ]);
  }
}

export { EventController };
