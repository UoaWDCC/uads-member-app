import { Timestamp } from 'bson';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import { clubSchema } from './clubSchema';

const { Schema } = mongoose;

export const userSchema = new Schema({
    firebaseAuth: {
        type: String,
        upi: {type: String, required: true}, //add firebase id and mongoose uuid
        displayName: {type: String, required: true},
        email: {type: String, required: true},
        emailVerified: {type: String, required: true},
        imagePath: String, //Path or URL?
    },
    firstName: String,
    lastName: String,
    university: String,
    gradLevel: {
        // type: String,
        enum: ['Undergraduate', 'Postgraduate'],
        default: 'Undergraduate'
    },
    clubMembership: [{
        name: String,
        start: Date,
        end: Date,
    }],
    // clubRequested: [{type: clubSchema}],
    created: Timestamp,
    modified: Timestamp,
    // deleted: Boolean,
    notificationsON: {type: Boolean, default: true}
   
})