"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const libraryErrors_1 = require("../utils/libraryErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
// Function to handle user registration
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registeredUser = yield (0, UserService_1.register)(user);
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
        }
        catch (error) {
            if (error.message.includes("E11000 duplicate key error validation")) {
                res.status(400).json({
                    message: "User with this email already exists",
                    error: error.message,
                });
            }
            else {
                res.status(500).json({
                    message: "Unable to register user at this time",
                    error: error.message,
                });
            }
        }
    });
}
// Function to handle user login
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const loggedIn = yield (0, UserService_1.login)(credentials);
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: loggedIn._id, email: loggedIn.email }, JWT_SECRET, { expiresIn: "1h" });
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
        }
        catch (error) {
            if (error instanceof libraryErrors_1.InvalidUsernameOrPasswordError) {
                res.status(401).json({
                    message: "Invalid username or password",
                    error: error.message,
                });
            }
            else {
                res.status(500).json({
                    message: "Unable to login user at this time",
                    error: error.message,
                });
            }
        }
    });
}
exports.default = { handleRegister, handleLogin };
