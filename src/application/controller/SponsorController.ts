import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { SponsorRepository } from '../../infrastructure/repository/SponsorRepository';
import { checkValidUrl } from '../../util/ValidationCheck';

class SponsorController extends BaseController {
  async getSponsors(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const queryParams: { [key: string]: string } = {
      club: 'clubs',
      discount: 'discountOffered',
      name: 'sponsorName',
    };

    var query = {};

    Object.entries(queryParams).forEach(([key, value]) => {
      if (req.query[key] != null) {
        query[value] = req.query[key];
      }
    });

    const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
    await sponsorRepo.isConnected();

    const result = await sponsorRepo.list(query);

    res.status(200).json(result);
  }

  async createSponsor(req: Request, res: Response) {
    const sponsorDetails = req.body;
    const { facebookHandle, twitterHandle, instagramHandle } = req.body;
    if (
      checkValidUrl(facebookHandle.url) &&
      checkValidUrl(twitterHandle.url) &&
      checkValidUrl(instagramHandle.url)
    ) {
      const mongoAdapter = MongoAdapter.getInstance();

      const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
      await sponsorRepo.isConnected();

      sponsorRepo.createSponsor(sponsorDetails);
      res.status(200).json();
    } else {
      res.status(404).json({ message: 'Invalid URL', status: 404 });
    }
  }

  async deleteSponsor(req: Request, res: Response) {
    const { uuid } = req.body;

    const mongoAdapter = MongoAdapter.getInstance();

    const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
    await sponsorRepo.isConnected();

    sponsorRepo.deleteSponsor(uuid);

    res.status(200).json();
  }

  async editSponsor(req: Request, res: Response) {
    const { uuid } = req.body;
    if (!uuid) {
      res.status(400).json();
      return;
    }
    const sponsorDetails = req.body;
    const mongoAdapter = MongoAdapter.getInstance();

    const sponsorRepo = new SponsorRepository(mongoAdapter, 'sponsorDetails');
    await sponsorRepo.isConnected();

    const { facebookHandle, twitterHandle, instagramHandle } = req.body;
    if (
      checkValidUrl(facebookHandle.url) &&
      checkValidUrl(twitterHandle.url) &&
      checkValidUrl(instagramHandle.url)
    ) {
      sponsorRepo.editSponsor(sponsorDetails);

      res.status(200).json();
    } else {
      res.status(404).json({ message: 'invalid url', status: 404 });
    }
  }
}

export { SponsorController };
