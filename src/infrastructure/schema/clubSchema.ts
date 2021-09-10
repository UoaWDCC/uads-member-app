import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { SponsorSchema } from './sponsorSchema';
import { EventSchema } from './eventSchema'
import { DiscountSchema } from './discountSchema';
import { IClub } from '../../domain/Entities';


export const ClubSchema = new Schema<IClub>({
    uuid: { type: uuid(), required: true },
    name: { type: String, required: true },
    desc: { type: String, required: false },
    imagePath: { type: String, required: false },
    admins: [{ type: String, required: true }],
    sponsors: [{ type: SponsorSchema, required: false }],
    events: [{ type: EventSchema, required: false }],
    discounts: [{ type: DiscountSchema, required: false }],
    photos: [{ type: String, required: false }],
});

const Club = model<IClub>('Club', ClubSchema);