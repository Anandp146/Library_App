"use strict";
// import express from "express";
// import BookController from "../controllers/BookController";
// import { Schemas, validateSchema } from "../middlewares/validation";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const router = express.Router();
// router.get("/", BookController.getAllBooks);
// router.post(
//   "/",
//   validateSchema(Schemas.book.create, "body"),
//   BookController.createBook
// );
// router.put(
//   "/",
//   validateSchema(Schemas.book.update, "body"),
//   BookController.updateBook
// );
// router.delete(
//   "/:barcode",
//   validateSchema(Schemas.book.delete, "params"),
//   BookController.deleteBook
// );
// router.get("/query", BookController.searchForBooksByQuery);
// export = router;
const express_1 = __importDefault(require("express"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get("/", BookController_1.default.getAllBooks);
router.post("/", (0, validation_1.validateSchema)(validation_1.Schemas.book.create, "body"), BookController_1.default.createBook);
router.put("/", (0, validation_1.validateSchema)(validation_1.Schemas.book.update, "body"), BookController_1.default.updateBook);
router.delete("/:barcode", (0, validation_1.validateSchema)(validation_1.Schemas.book.delete, "params"), BookController_1.default.deleteBook);
router.get("/query", BookController_1.default.searchForBooksByQuery);
module.exports = router;
