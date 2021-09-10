import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { IDiscount } from '../../domain/Entities';

export const DiscountSchema = new Schema<IDiscount>({
    uuid: { type: uuid(), required: true },
    name: { type: String, required: true},
    descDiscount: { type: String, required: true},
    imagePath: { type: String, required: false},
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