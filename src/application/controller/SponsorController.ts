import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { SponsorRepository } from '../../infrastructure/repository/SponsorRepository';
import { Console } from 'console';
import { mongo } from 'mongoose';

class SponsorController extends BaseController {
  async getSponsors(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
    await sponsorRepo.isConnected();

    const result = await sponsorRepo.list();
    console.log(result);

    res.status(200).json(result);
  }

  async createSponsor(req: Request, res: Response) {
    const sponsorDetails = req.body;
    const mongoAdapter = MongoAdapter.getInstance();

    const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
    await sponsorRepo.isConnected();
    sponsorRepo.createSponsor(sponsorDetails);

    res.status(200).json();
  }
}

export { SponsorController };
