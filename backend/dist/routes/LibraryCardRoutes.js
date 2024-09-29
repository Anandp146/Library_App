"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const LibraryCardController_1 = __importDefault(require("../controllers/LibraryCardController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get("/:cardId", (0, validation_1.validateSchema)(validation_1.Schemas.libraryCard.get, "params"), LibraryCardController_1.default.getLibraryCard);
router.post("/", (0, validation_1.validateSchema)(validation_1.Schemas.libraryCard.create, "body"), LibraryCardController_1.default.createLibraryCard);
module.exports = router;
