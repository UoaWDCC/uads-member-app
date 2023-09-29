import { model, Schema } from 'mongoose';
import { IVoucher } from '../../domain/Entities';

export const VoucherSchema = new Schema<IVoucher>({
  uuid: {type: String, required: true},
  description: {type: String, required: true},
  sponsor: {type: String, required: true},
  imageLink: {type: String, required: true}
});

const Discount = model<IVoucher>('Voucher', VoucherSchema);
