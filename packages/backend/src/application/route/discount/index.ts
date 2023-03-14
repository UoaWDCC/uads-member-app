import { Handler } from 'express';
import { DiscountController } from '../../controller/DiscountController';
import {isAuthenticated} from "../../../middleware/authentication";

const discountController = new DiscountController();

//Add more middleware handlers in the array
const get: Handler[] = [isAuthenticated, discountController.getDiscounts];
const post: Handler[] = [isAuthenticated, discountController.createDiscount];
const del: Handler[] = [isAuthenticated, discountController.deleteDiscount];
const put: Handler[] = [isAuthenticated, discountController.editDiscounts];

export {
  get as GET_DISCOUNT,
  post as POST_DISCOUNT,
  del as DELETE_DISCOUNT,
  put as PUT_DISCOUNT,
};
