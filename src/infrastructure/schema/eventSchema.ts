// JavaScript source code
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import 'mongoose-type-url';

const { Schema } = mongoose;

export const eventSchema = new Schema({
    id: {type: String, default: uuid()},
    name: String,
    date: Date,
    location: {
        building: Number,
        room: Number,
        description: String
    },
    imagePath: String,
    attendanceCap: Number,
    sponsor: [{ type: String, default: null }],
    url: String,
    
})