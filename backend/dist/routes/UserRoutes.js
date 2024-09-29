"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const validation_1 = require("../middlewares/validation");
// import authenticateToken from "../middlewares/Auth";
const router = express_1.default.Router();
// Apply authenticateToken middleware to protect these routes
// router.use(authenticateToken);
// Route to get all users
router.get("/", UserController_1.default.getAllUsers);
// Route to get a user by ID with validation
router.get("/:userId", (0, validation_1.validateSchema)(validation_1.Schemas.user.userId, "params"), UserController_1.default.getUserById);
// Route to update a user with validation
router.put("/:userId", (0, validation_1.validateSchema)(validation_1.Schemas.user.update, "body"), (0, validation_1.validateSchema)(validation_1.Schemas.user.userId, "params"), UserController_1.default.updateUser);
// Route to delete a user by ID with validation
router.delete("/:userId", (0, validation_1.validateSchema)(validation_1.Schemas.user.userId, "params"), UserController_1.default.deleteUser);
module.exports = router;
