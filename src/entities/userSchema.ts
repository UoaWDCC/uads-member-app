import { model, Schema } from 'mongoose';
import { IUser } from '.';

const UserSchema = new Schema<IUser>({
    firebaseAuth: {
        type: String,
        upi: {type: String, required: true}, //add firebase id and mongoose uuid
        displayName: {type: String, required: true},
        email: {type: String, required: true},
        emailVerified: {type: String, required: true},
        imagePath: String, //Path or URL?
    },
    uuid: {type: String, required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    university: {type: String, required: true},
    gradLevel: { type: {
        type: String,
        enum: ['Undergraduate', 'Postgraduate'],
    }, required: true },
    clubMembership: [{
        name: String,
        start: Date,
        end: Date,
    }],
    clubRequested: [{
        name: String,
    }],
    
    created: { type: Schema.Types.Number, required: true },
    modified: { type: Schema.Types.Number, required: true },
    notificationsON: {type: Schema.Types.Boolean, default: false }
});

export const Users = model<IUser>('Users', UserSchema);