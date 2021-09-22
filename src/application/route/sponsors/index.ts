import { Handler } from 'express';
import { SponsorController } from '../../controller/SponsorController';

const sponsorController = new SponsorController();

//Add more middleware handlers in the array
const get: Handler[] = [sponsorController.getSponsors];
const post: Handler[] = [sponsorController.createSponsor];
const del: Handler[] = [sponsorController.deleteSponsor];

export { get as GET_SPONSOR, post as POST_SPONSOR, del as DELETE_SPONSOR };
