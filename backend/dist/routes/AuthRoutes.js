"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = express_1.default.Router();
// Route to handle user registration
router.post("/register", (0, validation_1.validateSchema)(validation_1.Schemas.user.create, "body"), AuthController_1.default.handleRegister);
// Route to handle user login
router.post("/login", (0, validation_1.validateSchema)(validation_1.Schemas.user.login, "body"), AuthController_1.default.handleLogin);
module.exports = router;
