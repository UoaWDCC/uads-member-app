import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { IDiscount } from '../../domain/Entities';

export const DiscountSchema = new Schema<IDiscount>({
    id: {type: String, default: uuid()},
    name: String,
    desc: String,
    imagePath: String,
    startTime: {
        date: Date,
        hour: String,
        minute: String
    },
    endTime: {
        date: Date,
        hour: String,
        minute: String
    }
})

const Discount = model<IDiscount>('Discount', DiscountSchema);