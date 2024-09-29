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
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
// import { modifyUser } from "../services/modifyUser";
const libraryErrors_1 = require("../utils/libraryErrors");
// Function to get all users
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, UserService_1.findAllUsers)();
            res.status(200).json({
                message: "Users retrieved successfully",
                users,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Unable to retrieve users at this time",
                error: error.message,
            });
        }
    });
}
// Function to get a user by ID
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const user = yield (0, UserService_1.findUserById)(userId);
            res.status(200).json({
                message: "User found successfully",
                user,
            });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.UserDoesNotExistError) {
                res.status(404).json({
                    message: "User requested does not exist",
                });
            }
            else {
                res.status(500).json({
                    message: "Could not find user",
                    error: error.message,
                });
            }
        }
    });
}
// Function to update a user
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const updatedUser = yield (0, UserService_1.modifyUser)(user);
            res.status(202).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.UserDoesNotExistError) {
                res.status(404).json({
                    message: "User requested does not exist",
                });
            }
            else {
                res.status(500).json({
                    message: "Unable to update user at this time",
                    error: error.message,
                });
            }
        }
    });
}
// Function to delete a user
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            yield (0, UserService_1.removeUser)(userId);
            res.status(202).json({
                message: "User deleted successfully",
            });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.UserDoesNotExistError) {
                res.status(404).json({
                    message: "User requested does not exist",
                });
            }
            else {
                res.status(500).json({
                    message: "Unable to delete user at this time",
                    error: error.message,
                });
            }
        }
    });
}
exports.default = { getAllUsers, getUserById, updateUser, deleteUser };
