import { LoginDTO } from "./dto/login.dto.js";
import { SignupDTO } from "./dto/signup.dto.js";
import { EMAIL_REGEX } from "../../common/config/env.js";

export const validateLoginBody = (body: unknown): body is LoginDTO => {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const data = body as Record<string, unknown>;

  const allowedKeys = ["email", "password"] as const;
  const keys = Object.keys(data);

  if (
    keys.length !== allowedKeys.length ||
    !keys.every((key) =>
      allowedKeys.includes(key as (typeof allowedKeys)[number]),
    )
  ) {
    return false;
  }

  if (typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    return false;
  }

  if (typeof data.password !== "string" || data.password.length < 8) {
    return false;
  }

  return true;
};

export const validateSignupBody = (body: unknown): body is SignupDTO => {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const data = body as Record<string, unknown>;

  if (typeof data.name !== "string" || data.name.trim().length < 2) {
    return false;
  }

  if (typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    return false;
  }

  if (typeof data.password !== "string" || data.password.length < 8) {
    return false;
  }

  return true;
};
