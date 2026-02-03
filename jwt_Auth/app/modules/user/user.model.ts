import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser, IUserDocument } from './user.types.js';

const SALT_ROUNDS = 10;

const userSchema = new Schema<IUserDocument>(
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
      select: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);


userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});


userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export interface UserModelType extends Model<IUserDocument> {}

export const UserModel = model<IUserDocument, UserModelType>(
  'User',
  userSchema
);
