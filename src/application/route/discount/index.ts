import { Handler } from 'express';
import { DiscountController } from '../../controller/DiscountController';

const discountController = new DiscountController();

//Add more middleware handlers in the array
const get: Handler[] = [discountController.getSponsors];
const post: Handler[] = [discountController.createSponsor];
const del: Handler[] = [discountController.deleteSponsor];
const put: Handler[] = [discountController.editSponsor];

export {
  get as GET_SPONSOR,
  post as POST_SPONSOR,
  del as DELETE_SPONSOR,
  put as PUT_SPONSOR,
};
