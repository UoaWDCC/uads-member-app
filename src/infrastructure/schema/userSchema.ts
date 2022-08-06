import { model, Schema } from 'mongoose';
import { IUser } from '../../domain/Entities';

const UserSchema = new Schema<IUser>({
    upi: {type: String, required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    university: {type: String, required: true},
    gradLevel: { type: {
        type: String,
        enum: ['Undergraduate', 'Postgraduate'],
    }},
    notificationsOn: {type: Schema.Types.Boolean, default: false }
},
{
    timestamps: true
});

export const Users = model<IUser>('Users', UserSchema);
