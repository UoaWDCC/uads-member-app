import { Handler } from 'express';
import { isAuthenticated } from '../../../middleware/authentication';
import { DiscountController } from '../../controller/DiscountController';

const discountController = new DiscountController();

//Add more middleware handlers in the array
const get: Handler[] = [isAuthenticated, discountController.getDiscounts];
const getDiscount: Handler[] = [
  isAuthenticated,
  discountController.getDiscount,
];

export { get as GET_DISCOUNT };
