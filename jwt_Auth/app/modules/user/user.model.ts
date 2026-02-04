import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { IUser, IUserMethods } from './user.types.js';

const SALT_ROUNDS = 12;


const userSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>, IUserMethods>(
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
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpiresAt: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);


userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});


userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function (): string {
  const rawToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  this.resetPasswordExpiresAt = new Date(
    Date.now() + 15 * 60 * 1000
  );

  return rawToken;
};


export const UserModel = model<IUser, Model<IUser, {}, IUserMethods>>(
  'User',
  userSchema
);
