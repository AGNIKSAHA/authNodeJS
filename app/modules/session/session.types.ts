import { Types, HydratedDocument} from 'mongoose';

export interface ISession {
  sessionId: string;
  userId: Types.ObjectId;
  expiresAt: Date;
}


export interface ISession {
  sessionId: string;
  userId: Types.ObjectId;
  expiresAt: Date;
}

export type SessionDocument = HydratedDocument<ISession>;