import { Handler } from 'express';
import { VoucherController } from '../../controller/VoucherController';
import { isAuthenticated } from '../../../middleware/authentication';

const voucherController = new VoucherController();

//Add more middleware handlers in the array
const get: Handler[] = [isAuthenticated, voucherController.getVouchers];
const post: Handler[] = [isAuthenticated, voucherController.createVoucher];
const del: Handler[] = [isAuthenticated, voucherController.deleteVoucher];
const put: Handler[] = [isAuthenticated, voucherController.editVouchers];

export {
  get as GET_VOUCHER,
  post as POST_VOUCHER,
  del as DELETE_VOUCHER,
  put as PUT_VOUCHER,
};
