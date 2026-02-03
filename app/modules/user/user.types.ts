import { HydratedDocument } from 'mongoose';


export interface IUser {
  name: string;
  email: string;
  password: string;
}


export interface IUserTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser & IUserTimestamps>;



export interface SignupBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
