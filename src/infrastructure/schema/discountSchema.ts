import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import 'mongoose-type-url';

const { Schema } = mongoose;

const dicountSchema = new Schema({
    id: {type: UUID, default: uuidv4},
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