import { Handler } from 'express';
import { DiscountController } from '../../controller/DiscountController';
import { isAuthenticated } from '../../../middleware/authentication';

const discountController = new DiscountController();

const get: Handler[] = [isAuthenticated, discountController.getDiscount];
const redeem: Handler[] = [isAuthenticated, discountController.redeemDiscount];

export { get as GET_DISCOUNT_ID, redeem as POST_DISCOUNT_ID_REDEEM };
