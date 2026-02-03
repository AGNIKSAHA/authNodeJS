import { LoginDTO } from './dto/login.dto.js';
import { SignupDTO } from './dto/signup.dto.js';

export const validateLoginBody = (
  body: unknown
): body is LoginDTO => {
  if (typeof body !== 'object' || body === null) return false;

  const data = body as Record<string, unknown>;
  const keys = Object.keys(data);

  if (keys.length !== 2) return false;

  return (
    typeof data.email === 'string' &&
    typeof data.password === 'string'
  );
};

export const validateSignupBody = (
  body: unknown
): body is SignupDTO => {
  if (typeof body !== 'object' || body === null) return false;

  const data = body as Record<string, unknown>;
  const keys = Object.keys(data);

  if (keys.length !== 3) return false;

  return (
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.password === 'string'
  );
};
