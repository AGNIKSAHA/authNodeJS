import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env.js";

export interface AuthPayload {
  userId: string;
}

export const signAccessToken = (payload: AuthPayload): string => {
  const options: SignOptions = {
    expiresIn: ENV.JWT_ACCESS_EXPIRES_IN,
  };

  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET!, options);
};

export const signRefreshToken = (payload: AuthPayload): string => {
  const options: SignOptions = {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
  };

  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET!, options);
};

export const verifyAccessToken = (token: string): JwtPayload & AuthPayload => {
  return jwt.verify(token, ENV.JWT_ACCESS_SECRET!) as JwtPayload & AuthPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload & AuthPayload => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET!) as JwtPayload & AuthPayload;
};
