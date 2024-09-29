import express from "express";
import LibraryCardController from "../controllers/LibraryCardController";
import { Schemas, validateSchema } from "../middlewares/validation";
const router = express.Router();
router.get(
  "/:cardId",
  validateSchema(Schemas.libraryCard.get, "params"),
  LibraryCardController.getLibraryCard
);
router.post(
  "/",
  validateSchema(Schemas.libraryCard.create, "body"),
  LibraryCardController.createLibraryCard
);
export = router;
