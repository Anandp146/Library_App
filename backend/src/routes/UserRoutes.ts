import express from "express";
import UserController from "../controllers/UserController";
import { Schemas, validateSchema } from "../middlewares/validation";
// import authenticateToken from "../middlewares/Auth";

const router = express.Router();

// Apply authenticateToken middleware to protect these routes
// router.use(authenticateToken);

// Route to get all users
router.get("/", UserController.getAllUsers);

// Route to get a user by ID with validation
router.get(
  "/:userId",
  validateSchema(Schemas.user.userId, "params"),
  UserController.getUserById
);

// Route to update a user with validation
router.put(
  "/:userId",
  validateSchema(Schemas.user.update, "body"),
  validateSchema(Schemas.user.userId, "params"),
  UserController.updateUser
);

// Route to delete a user by ID with validation
router.delete(
  "/:userId",
  validateSchema(Schemas.user.userId, "params"),
  UserController.deleteUser
);

export = router;
