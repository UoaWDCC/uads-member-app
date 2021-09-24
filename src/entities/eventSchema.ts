// JavaScript source code
import { model, Schema } from 'mongoose';
import { uuid } from 'uuidv4';
import { IEvent } from '.'; 

export const EventSchema = new Schema<IEvent>({
    uuid: { type: String, default: uuid },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: {
        building: Number,
        room: Number,
        description: String
    }, required: true},
    imagePath: { type: String, required: false },
    attendanceCap: { type: Schema.Types.Number, required: false},
    sponsor: [{ type: String, default: null }],
    url: {type: String, required: false},
});

const Club = model<IEvent>('Event', EventSchema);