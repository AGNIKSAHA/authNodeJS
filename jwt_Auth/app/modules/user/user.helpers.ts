import { UserDocument } from "./user.types.js";

export const asUserDocument = (doc: unknown): UserDocument => {
  return doc as UserDocument;
};
