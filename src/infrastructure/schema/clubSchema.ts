import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { SponsorSchema } from './SponsorSchema';
import { EventSchema } from './EventSchema'
import { DiscountSchema } from './DiscountSchema';
import { IClub } from '../../domain/Entities';


export const ClubSchema = new Schema<IClub>({
    id: { type: String, default: uuid() },
    name: { type: String, required: true },
    desc: { type: String, required: false },
    imagePath: { type: String, required: false },
    admins: [{ type: String, required: true }],  //String is returned when a uuid is generated - so this string value refers to the uuid of the user.
    sponsors: [{ type: SponsorSchema, required: false }],
    events: [{ type: EventSchema, required: false }],
    discounts: [{ type: DiscountSchema, required: false }],
    photos: [{ type: String }],
});

const Club = model<IClub>('Club', ClubSchema);