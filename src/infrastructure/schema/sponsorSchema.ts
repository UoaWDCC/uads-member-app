// JavaScript source code
import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { ClubSchema } from './ClubSchema';


export const SponsorSchema = new Schema({
    id: {type: String, default: uuid()},
    companyName: String,
    sponsorDesc: String,
    companyRepName: String, //to store the name of the person to contact for communication.
    imagePath: String,
    instagramHandle: {
        username: String,
        url: String,
    },
    facebookHandle: {
        username: String,
        url: String,
    },
    twitterHandle: {
        username: String,
        url: String, 
    },
    
    tier: {
        type: Number,
        enum: [1, 2, 3, 4], //1 being the highest level of sponsor
        default: 4
    }, 
    
    phone: Number,
    email: String,
    
    address: {
        streetNo: String,  //string to allow for additional info such as level, building number, etc.
        streetName: String,
        city: String,
    }, 
    websiteUrl: String,
    discountsOffered: [{type: String, default: null}],
    clubs: [{type: ClubSchema, default: null}]

})
