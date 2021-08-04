// JavaScript source code
import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import 'mongoose-type-url';



const { Schema } = mongoose;

const sponsorSchema = new Schema({
    id: {type: UUID, default: uuidv4},
    companyName: String,
    sponsorDesc: String,
    companyRepName: String, //to store the name of the person to contact for communication.
    imagePath: String,
    instagramHandle: {
        username: String,
        url: mongoose.SchemaTypes.Url
    },
    facebookHandle: {
        username: String,
        url: mongoose.SchemaTypes.Url
    },
    twitterHandle: {
        username: String,
        url: mongoose.SchemaTypes.Url
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
    websiteUrl: mongoose.SchemaTypes.Url,
    discountsOffered: [{type: UUID, default: null}],
    clubs: [{type: clubSchema, default: null}]

})