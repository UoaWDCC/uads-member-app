// JavaScript source code
import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { IEvent } from '../../domain/Entities';

export const EventSchema = new Schema<IEvent>({
    uuid: { type: uuid(), required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: {
        building: Number,
        room: Number,
        description: String
    }, required: true},
    imagePath: { type: String, required: false },
    attendanceCap: { type: Number, required: false},
    sponsor: [{ type: String, default: null }],
    url: {type: String, required: false},
});

const Club = model<IEvent>('Event', EventSchema);