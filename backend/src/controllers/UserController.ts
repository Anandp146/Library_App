import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  modifyUser,
  removeUser,
} from "../services/UserService";
// import { modifyUser } from "../services/modifyUser";
import { UserDoesNotExistError } from "../utils/libraryErrors";

// Function to get all users
async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Unable to retrieve users at this time",
      error: error.message,
    });
  }
}

// Function to get a user by ID
async function getUserById(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;

  try {
    const user = await findUserById(userId);
    res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError) {
      res.status(404).json({
        message: "User requested does not exist",
      });
    } else {
      res.status(500).json({
        message: "Could not find user",
        error: error.message,
      });
    }
  }
}

// Function to update a user
async function updateUser(req: Request, res: Response): Promise<void> {
  const user = req.body;

  try {
    const updatedUser = await modifyUser(user);
    res.status(202).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError) {
      res.status(404).json({
        message: "User requested does not exist",
      });
    } else {
      res.status(500).json({
        message: "Unable to update user at this time",
        error: error.message,
      });
    }
  }
}

// Function to delete a user
async function deleteUser(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;

  try {
    await removeUser(userId);
    res.status(202).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError) {
      res.status(404).json({
        message: "User requested does not exist",
      });
    } else {
      res.status(500).json({
        message: "Unable to delete user at this time",
        error: error.message,
      });
    }
  }
}

export default { getAllUsers, getUserById, updateUser, deleteUser };
