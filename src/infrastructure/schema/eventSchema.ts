// JavaScript source code
import mongoose from 'mongoose';
import { model, Schema, Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { IEvent } from '../../domain/Entities';

export const EventSchema = new Schema<IEvent>({
    id: {type: String, default: uuid()},
    name: String,
    date: Date,
    location: {
        building: Number,
        room: Number,
        description: String
    },
    imagePath: String,
    attendanceCap: Number,
    sponsor: [{ type: String, default: null }],
    url: String,
});

const Club = model<IEvent>('Event', EventSchema);