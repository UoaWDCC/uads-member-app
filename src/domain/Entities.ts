import { Number } from "mongoose";

interface IDiscount {
    uuid: string;
    name: string;
    descDiscount: string;
    imagePath?: string;
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
    uuid: string;
    companyName: string;
    sponsorDesc: string;
    companyRepName: string;
    imagePath?: string;
    instagramHandle?: {
        username: string;
        url: string;
    },
    facebookHandle?: {
        username: string;
        url: string;
    },
    twitterHandle?: {
        username: string;
        url: string;
    },

    tier: {
        type: Number;
        enum: [1, 2, 3, 4];
    },
    phone: Number;
    email: string,

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
    uuid: string;
    name: string;
    date: Date;
    location: {
        building: Number;
        room: Number;
        description: string;
    },
    imagePath?: string;
    attendanceCap?: Number;
    sponsor: string [];
    url?: string;
}

interface IClub {
    uuid: string; 
    name: string;
    desc?: string;
    imagePath?: string;
    admins: string [];
    sponsors?: ISponsor[];
    events?: IEvent[];
    discounts?: IDiscount[];
    photos?: string[];
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
    uuid: string;
    firstName: string;
    lastName: string;
    university: string;
    gradLevel: {
        type: string;
        enum: ['Undergraduate', 'Postgraduate'];
    },
    clubMembership: [{
        name: string;
        start: Date,
        end: Date,
    }];
    clubRequested: [{
        name: String,
    }];
    created: Number;
    modified: Number;
    notificationsON?: Boolean;
}

export {
    IEvent, ISponsor, IDiscount, IClub, IUser
}