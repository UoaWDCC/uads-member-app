import mongoose from 'mongoose';
import { uuid } from 'uuidv4';

const { Schema } = mongoose;

export const discountSchema = new Schema({
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

