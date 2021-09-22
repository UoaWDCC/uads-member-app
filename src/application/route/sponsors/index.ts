import { Handler } from 'express';
import { SponsorController } from '../../controller/SponsorController';

const sponsorController = new SponsorController();

//Add more middleware handlers in the array
const get: Handler[] = [sponsorController.getSponsors];

export { get as GET_SPONSOR };
