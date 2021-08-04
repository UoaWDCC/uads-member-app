import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import 'mongoose-type-url';

const { Schema } = mongoose;

const clubSchema = new Schema({
    id: {type: UUID, default: uuidv4},
    name: String,
    desc: String,
    imagePath: String,
    admins: [{type: UUID}],  
    sponsors: [{type: sponsorSchema}],
    events: [{type: eventSchema}],
    discounts: [{type: discountSchema}],
    photos: [{type: String}],
})