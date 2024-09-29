import { Request, Response } from "express";
import { register, login } from "../services/UserService";
import { IUser } from "../models/User";
import { IUserModel } from "../models/User";
import { InvalidUsernameOrPasswordError } from "../utils/libraryErrors";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Function to handle user registration
async function handleRegister(req: Request, res: Response) {
  const user: IUser = req.body;

  try {
    const registeredUser = await register(user);
    res.status(201).json({
      message: "User successfully created",
      user: {
        _id: registeredUser._id,
        type: registeredUser.type,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
    });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error validation")) {
      res.status(400).json({
        message: "User with this email already exists",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unable to register user at this time",
        error: error.message,
      });
    }
  }
}

// Function to handle user login
async function handleLogin(req: Request, res: Response) {
  const credentials = req.body;

  try {
    const loggedIn: IUserModel = await login(credentials);

    // Generate JWT token
    const token = jwt.sign(
      { userId: loggedIn._id, email: loggedIn.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: loggedIn._id,
        type: loggedIn.type,
        firstName: loggedIn.firstName,
        lastName: loggedIn.lastName,
        email: loggedIn.email,
      },
    });
  } catch (error: any) {
    if (error instanceof InvalidUsernameOrPasswordError) {
      res.status(401).json({
        message: "Invalid username or password",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unable to login user at this time",
        error: error.message,
      });
    }
  }
}

export default { handleRegister, handleLogin };
