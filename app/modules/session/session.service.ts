import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { SessionDocument } from './session.types.js';
import { SessionModel } from './session.model.js';

// const SESSION_DURATION_MS:number= 1000 * 60 * 60 * 24; 
// 24 hours
const SESSION_DURATION_MS:number= 1000 * 10; //10sec

export const createSession = async (
  userId: Types.ObjectId
): Promise<string> => {
  const sessionId: string = uuidv4();

  await SessionModel.create({
    sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
  });

  return sessionId;
};


export const getSessionUserId = async (
  sessionId: string
): Promise<Types.ObjectId | null> => {
  const session: SessionDocument  | null  = await SessionModel.findOne({ sessionId });

  if (session === null) {
    return null;
  }

  if (session.expiresAt.getTime() < Date.now()) {
    await SessionModel.deleteOne({ sessionId });
    return null;
  }

  return session.userId;
};

export const deleteSession = async (
  sessionId: string
): Promise<void> => {
  await SessionModel.deleteOne({ sessionId });
};