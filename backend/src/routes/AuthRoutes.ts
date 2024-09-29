import express from "express";
import { Schemas, validateSchema } from "../middlewares/validation";
import AuthController from "../controllers/AuthController";

const router = express.Router();

// Route to handle user registration
router.post(
  "/register",
  validateSchema(Schemas.user.create, "body"),
  AuthController.handleRegister
);

// Route to handle user login
router.post(
  "/login",
  validateSchema(Schemas.user.login, "body"),
  AuthController.handleLogin
);

export = router;
