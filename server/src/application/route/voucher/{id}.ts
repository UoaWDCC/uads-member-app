import { Handler } from 'express';
import { VoucherController } from '../../controller/VoucherController';
import { isAuthenticated } from '../../../middleware/authentication';

const voucherController = new VoucherController();

const get: Handler[] = [isAuthenticated, voucherController.getVoucher];
const redeem: Handler[] = [isAuthenticated, voucherController.redeemVoucher];

export { get as GET_VOUCHER_ID, redeem as POST_VOUCHER_ID_REDEEM };
