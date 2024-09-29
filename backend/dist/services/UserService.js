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
exports.removeUser = exports.modifyUser = exports.findUserById = exports.findAllUsers = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const User_1 = __importDefault(require("../models/User"));
const libraryErrors_1 = require("../utils/libraryErrors");
// Function to register a new user
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Hash the user's password using bcrypt
            const hashedPassword = yield bcrypt_1.default.hash(user.password, config_1.config.server.rounds);
            // Create a new UserDao instance with the hashed password
            const savedUser = new User_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            // Save the user to the database and return the saved user
            return yield savedUser.save();
        }
        catch (error) {
            // If an error occurs, throw an appropriate error
            throw new libraryErrors_1.UnableToSaveUserError("Unable to save user.");
        }
    });
}
exports.register = register;
// Function to authenticate user login
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credentials;
        try {
            // Find user by email
            const user = yield User_1.default.findOne({ email });
            // If user not found or password is incorrect, throw error
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new libraryErrors_1.InvalidUsernameOrPasswordError("Invalid username or password");
            }
            // Return the authenticated user
            return user;
        }
        catch (error) {
            // If an error occurs, throw an appropriate error
            throw new libraryErrors_1.InvalidUsernameOrPasswordError("Invalid username or password");
        }
    });
}
exports.login = login;
// Function to retrieve all users
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find all users
            return yield User_1.default.find();
        }
        catch (error) {
            // If an error occurs, return an empty array
            return [];
        }
    });
}
exports.findAllUsers = findAllUsers;
// Function to find a user by ID
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find user by ID
            const user = yield User_1.default.findById(userId);
            // If user not found, throw error
            if (!user) {
                throw new libraryErrors_1.UserDoesNotExistError("User does not exist with this ID");
            }
            // Return the found user
            return user;
        }
        catch (error) {
            // If an error occurs, throw an appropriate error
            throw new libraryErrors_1.UserDoesNotExistError("User does not exist with this ID");
        }
    });
}
exports.findUserById = findUserById;
// Function to update a user
function modifyUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Update user and return the updated user
            let id = yield User_1.default.findByIdAndUpdate(user._id, user, { new: true });
            if (!id)
                throw new libraryErrors_1.UserDoesNotExistError("User Does Not Exist With This Id");
            return user;
            // return await UserDao.findByIdAndUpdate(user._id, user, { new: true });
        }
        catch (error) {
            // If an error occurs, throw an appropriate error
            throw new libraryErrors_1.UserDoesNotExistError("User does not exist with this ID");
        }
    });
}
exports.modifyUser = modifyUser;
// Function to remove a user by ID
function removeUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Remove user by ID
            const deletedUser = yield User_1.default.findByIdAndDelete(userId);
            // If user not found, throw error
            if (!deletedUser) {
                throw new libraryErrors_1.UserDoesNotExistError("User does not exist with this ID");
            }
            // Return success message
            return "User deleted successfully";
        }
        catch (error) {
            // If an error occurs, throw an appropriate error
            throw new libraryErrors_1.UserDoesNotExistError("User does not exist with this ID");
        }
    });
}
exports.removeUser = removeUser;
