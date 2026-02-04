import dotenv from "dotenv";

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not defined`);
  }
  return value;
};

const requiredNumber = (key: string): number => {
  const value = Number(process.env[key]);
  if (Number.isNaN(value)) {
    throw new Error(`${key} must be a valid number`);
  }
  return value;
};

export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV ?? "development",

  MONGO_URI: required("MONGO_URI"),

  JWT_ACCESS_SECRET: required("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),

  JWT_ACCESS_EXPIRES_IN: requiredNumber("JWT_ACCESS_EXPIRES_IN"),
  JWT_REFRESH_EXPIRES_IN: requiredNumber("JWT_REFRESH_EXPIRES_IN"),
} as const;

export const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
