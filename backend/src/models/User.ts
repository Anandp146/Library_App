export interface IUser {
  type: "ADMIN" | "EMPLOYEE" | "PATRON"; //patron is a person who uses the library's resources and services, whether or not they are a registered borrower
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

import mongoose, { Schema, Document } from "mongoose";

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema(
  {
    type: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
export default mongoose.model<IUserModel>("User", UserSchema);
