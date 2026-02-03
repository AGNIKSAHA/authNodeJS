import { LoginBody } from './user.types.js';


export const validateLoginBody = (
  body: unknown
): body is LoginBody => {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const data = body as Record<string, unknown>;


  const allowedKeys = ['email', 'password'];
  const bodyKeys = Object.keys(data);


  if (
    bodyKeys.length !== allowedKeys.length ||
    !bodyKeys.every((key) => allowedKeys.includes(key))
  ) {
    return false;
  }


  if (
    typeof data.email !== 'string' ||
    data.email.trim().length === 0 ||
    typeof data.password !== 'string' ||
    data.password.trim().length === 0
  ) {
    return false;
  }

  return true;
};
