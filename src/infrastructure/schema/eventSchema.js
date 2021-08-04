// JavaScript source code
import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const { Schema } = mongoose;

const eventSchema = new Schema({
    id: {type: UUID, default: uuidv4},
    name: String,
    date: Date,
    location: {
        building: Number,
        room: Number,
        description: String
    },
    imagePath: String,
    attendanceCap: Number,
    sponsor: [{ type: UUID, default: null }],
    url: String,
    
})