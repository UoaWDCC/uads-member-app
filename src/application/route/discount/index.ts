import { Handler } from 'express';
import { DiscountController } from '../../controller/DiscountController';

const discountController = new DiscountController();

//Add more middleware handlers in the array
const get: Handler[] = [discountController.getDiscounts];
const post: Handler[] = [discountController.createDiscount];
// const del: Handler[] = [discountController.deleteDiscounts];
// const put: Handler[] = [discountController.editDiscounts];

export {
  get as GET_DISCOUNT,
  post as POST_DISCOUNT,
  // del as DELETE_DISCOUNT,
  // put as PUT_DISCOUNT,
};
