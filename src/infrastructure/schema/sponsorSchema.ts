// JavaScript source code
import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { ISponsor } from '../../domain/Entities';
import { ClubSchema } from './clubSchema';


export const SponsorSchema = new Schema<ISponsor>({
    uuid: { type: uuid(), required: true },
    companyName: { type: String, required: true },
    sponsorDesc: { type: String, required: true },
    companyRepName: { type: String, required: true },
    imagePath: { type: String, required: false },
    instagramHandle: { type: {
        username: String,
        url: String,
    }, required: false },
    facebookHandle: { type: {
        username: String,
        url: String,
    }, required: false },
    twitterHandle: { type: {
        username: String,
        url: String,
    }, required: false },
    
    tier: { type: {
        type: Number,
        enum: [1, 2, 3, 4], //1 being the highest level of sponsor
    }, required: true },
    
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    
    address: {
        streetNo: String,  //string to allow for additional info such as level, building number, etc.
        streetName: String,
        city: String,
    }, 
    websiteUrl: String,
    discountsOffered: [{type: String, default: null }],
    clubs: [{type: ClubSchema, default: null}]
})
