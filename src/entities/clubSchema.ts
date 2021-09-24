import { model, Schema } from 'mongoose';
import { SponsorSchema } from './sponsorSchema';
import { EventSchema } from './eventSchema'
import { DiscountSchema } from './discountSchema';
import { IClub } from '.';

export const ClubSchema = new Schema<IClub>({
    uuid: { type: String, required: true },
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