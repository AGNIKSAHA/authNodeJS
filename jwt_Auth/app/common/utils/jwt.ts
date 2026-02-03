import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export interface AuthPayload {
  userId: string;
}

const signOptions: SignOptions = {
  expiresIn: Number(ENV.JWT_EXPIRES_IN) || 60 * 60 * 24,
};

export const signToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, ENV.JWT_SECRET as string, signOptions);
};

export const verifyToken = (
  token: string
): JwtPayload & AuthPayload => {
  return jwt.verify(token, ENV.JWT_SECRET as string) as JwtPayload &
    AuthPayload;
};
