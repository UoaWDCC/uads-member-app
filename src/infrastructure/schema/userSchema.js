import { Timestamp } from 'bson';
import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import 'mongoose-type-url';

const { Schema } = mongoose;

const userSchema = new Schema({
    //password: {type: String, required: true}, //need hashing - https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
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
        type: String,
        enum: ['Undergraduate', 'Postgraduate'],
        default: 'Undergraduate'
    },
    clubMembership: [{type: clubSchema}],
    clubRequested: [{type: clubSchema}],
    membershipStart: Date,
    membershipEnd: Date,
    created: Timestamp,
    modified: Timestamp,
    deleted: Timestamp,
    notificationsON: {type: Boolean, default: true}




})