// JavaScript source code
import { model, Schema } from 'mongoose';
import { uuid } from 'uuidv4';
import { IEvent } from '../../domain/Entities';

export const EventSchema = new Schema<IEvent>({
  uuid: { type: String, default: uuid },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  dateTime: { type: String, required: true },
  location: { type: String, required: true },
  imagePath: { type: String, required: true },
  sponsors: [{ type: [String], required: false }],
  urlSignUp: { type: String, required: false },
});

const Event = model<IEvent>('Event', EventSchema);
