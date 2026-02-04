import { Document, HydratedDocument} from 'mongoose';


export interface IUser {
  name: string;
  email: string;
  password: string;

  resetPasswordToken?: string | undefined;
  resetPasswordExpiresAt?: Date | undefined;
}


export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
}


export type UserDocument = HydratedDocument<IUser, IUserMethods>;

export interface SignupBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ForgotPasswordBody {
  email?: string;
}


export interface ResetPasswordBody {
  password?: string;
}