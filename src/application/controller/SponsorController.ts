import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { SponsorRepository } from '../../infrastructure/repository/SponsorRepository';
import { Console } from 'console';
class SponsorController extends BaseController {
  async getSponsors(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
    await sponsorRepo.isConnected();

    const result = await sponsorRepo.list();

    res.status(404).json({ Message: 'Not Found', Success: false });
    // res.status(200).json(result);
  }
}

export { SponsorController };
