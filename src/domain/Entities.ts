import { Timestamp } from "bson";
import { Number } from "mongoose";
import { Url } from "url";

interface IDiscount {
    id: string;
    name: string;
    desc: string;
    imagePath: string;
    startTime: {
        date: Date;
        hour: string;
        minute: string;
    },
    endTime: {
        date: Date;
        hour: string;
        minute: string;
    }
}

interface ISponsor {
    id: string;
    companyName: string;
    sponsorDesc: string;
    companyRepName: string;
    imaginePath: string;
    instagramHandle: {
        username: string;
        url: string;
    },
    facebookHandle: {
        username: string;
        url: string;
    },
    twitterHandle: {
        username: string;
        url: string;
    },

    tier: {
        type: Number;
        enum: [1, 2, 3, 4];
        default: 4;
    },
    phone: Number;
    email: String,

    address: {
        streetNo: string;
        streetName: string;
        city: string;
    },
    websiteUrl: string;
    discountsOffered: string [];
    clubs: IClub [];
}

interface IEvent {
    id: string;
    name: string;
    date: Date;
    location: {
        building: Number;
        room: Number;
        description: string;
    },
    imagePath: string;
    attendanceCap: Number;
    sponsor: string [];
    url: string;
}

interface IClub {
    id: string; 
    name: string;
    imagePath: string;
    admins: string [];
    sponsors: ISponsor[];
    events: IEvent[];
    discounts: IDiscount[];
    photos: string[];
}

interface IUser {
    firebaseAuth: {
        type: string;
        upi: string;
        displayName: string;
        email: string;
        emailVerified: string;
        imagePath: string;
    },
    firstName: string;
    lastName: string;
    university: string;
    gradLevel: {
        type: string;
        enum: ['Undergraduate', 'Postgraduate'];
        default: 'Undergraduate';
    },
    clubMembership: [{
        name: string;
    }];
    clubRequested: IClub [];
    created: Timestamp;
    modified: Timestamp;
    notificationsON: Boolean;
}

export {
    IEvent, ISponsor, IDiscount, IClub, IUser
}