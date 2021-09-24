import { model, Schema } from 'mongoose';
import { IDiscount } from '.';

export const DiscountSchema = new Schema<IDiscount>({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    descDiscount: { type: String, required: true },
    imagePath: { type: String, required: false },
    startTime: { type: {
        date: Date,
        hour: String,
        minute: String
    }, required: true },
    endTime: { type: {
        date: Date,
        hour: String,
        minute: String
    }, required: true },
})

const Discount = model<IDiscount>('Discount', DiscountSchema);