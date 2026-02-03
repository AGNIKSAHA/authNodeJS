import { Schema, model, Model } from 'mongoose';
import { IUser } from './user.types.js';


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true, // disallow unknown fields at runtime
  }
);

export interface UserModelType extends Model<IUser> {}

export const UserModel = model<IUser, UserModelType>(
  'User',
  userSchema
);
