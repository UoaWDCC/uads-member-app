import { Timestamp } from 'bson';
import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { IUser } from '../../domain/Entities';

const UserSchema = new Schema<IUser>({
    firebaseAuth: {
        type: String,
        upi: {type: String, required: true}, //add firebase id and mongoose uuid
        displayName: {type: String, required: true},
        email: {type: String, required: true},
        emailVerified: {type: String, required: true},
        imagePath: String, //Path or URL?
    },
    uuid: {type: uuid(), required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    university: {type: String, required: true},
    gradLevel: {
        type: String,
        enum: ['Undergraduate', 'Postgraduate'],
        default: 'Undergraduate'
    },
    clubMembership: [{
        name: String,
        start: Date,
        end: Date,
    }],
    clubRequested: [{
        name: String,
    }],
    created: { type: Timestamp, required: true },
    modified: { type: Timestamp, required: true },
    notificationsON: {type: Boolean, default: false }
});

export const Users = model<IUser>('Users', UserSchema);