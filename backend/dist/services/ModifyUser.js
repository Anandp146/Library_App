"use strict";
// import bcrypt from "bcrypt";
// import { config } from "../config";
// import UserDao, { IUserModel } from "../models/User";
// import { IUser } from "../models/User";
// import {
//   InvalidUsernameOrPasswordError,
//   UnableToSaveUserError,
//   UserDoesNotExistError,
// } from "../utils/libraryErrors";
// // Function to register a new user
// export async function register(user: IUser): Promise<IUserModel> {
//   try {
//     // Hash the user's password using bcrypt
//     const hashedPassword = await bcrypt.hash(
//       user.password,
//       config.server.rounds
//     );
//     // Create a new UserDao instance with the hashed password
//     const savedUser = new UserDao({ ...user, password: hashedPassword });
//     // Save the user to the database and return the saved user
//     return await savedUser.save();
//   } catch (error) {
//     // If an error occurs, throw an appropriate error
//     throw new UnableToSaveUserError("Unable to save user.");
//   }
// }
// // Function to authenticate user login
// export async function login(credentials: {
//   email: string;
//   password: string;
// }): Promise<IUserModel> {
//   const { email, password } = credentials;
//   try {
//     // Find user by email
//     const user = await UserDao.findOne({ email });
//     // If user not found or password is incorrect, throw error
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new InvalidUsernameOrPasswordError("Invalid username or password");
//     }
//     // Return the authenticated user
//     return user;
//   } catch (error) {
//     // If an error occurs, throw an appropriate error
//     throw new InvalidUsernameOrPasswordError("Invalid username or password");
//   }
// }
// // Function to retrieve all users
// export async function findAllUsers(): Promise<IUserModel[]> {
//   try {
//     // Find all users
//     return await UserDao.find();
//   } catch (error) {
//     // If an error occurs, return an empty array
//     return [];
//   }
// }
// // Function to find a user by ID
// export async function findUserById(userId: string): Promise<IUserModel> {
//   try {
//     // Find user by ID
//     const user = await UserDao.findById(userId);
//     // If user not found, throw error
//     if (!user) {
//       throw new UserDoesNotExistError("User does not exist with this ID");
//     }
//     // Return the found user
//     return user;
//   } catch (error) {
//     // If an error occurs, throw an appropriate error
//     throw new UserDoesNotExistError("User does not exist with this ID");
//   }
// }
// // Function to update a user
// export async function modifyUser(user: IUserModel): Promise<IUserModel> {
//   try {
//     let id = await UserDao.findByIdAndUpdate(user._id, user, { new: true });
//     if (!id)
//       throw new UserDoesNotExistError("User Does Not Exist With This Id");
//     return user;
//   } catch (error: any) {
//     throw new error();
//   }
// }
// // Function to remove a user by ID
// export async function removeUser(userId: string): Promise<string> {
//   try {
//     // Remove user by ID
//     const deletedUser = await UserDao.findByIdAndDelete(userId);
//     // If user not found, throw error
//     if (!deletedUser) {
//       throw new UserDoesNotExistError("User does not exist with this ID");
//     }
//     // Return success message
//     return "User deleted successfully";
//   } catch (error) {
//     // If an error occurs, throw an appropriate error
//     throw new UserDoesNotExistError("User does not exist with this ID");
//   }
// }
