import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import { sponsorSchema } from './sponsorSchema';
import { eventSchema } from './eventSchema'
import { discountSchema } from './discountSchema';

const { Schema } = mongoose;

export const clubSchema = new Schema({
    id: {type: String, default: uuid()},
    name: String,
    desc: String,
    imagePath: String,
    admins: [{type: String}],  //String is returned when a uuid is generated - so this string value refers to the uuid of the user.
    sponsors: [{type: sponsorSchema}],
    events: [{type: eventSchema }],
    discounts: [{type: discountSchema}],
    photos: [{type: String}],
})