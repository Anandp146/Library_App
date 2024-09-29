import LoanRecordController from "../controllers/LoanRecordController";
import express from "express";
import { Schemas, validateSchema } from "../middlewares/validation";
const router = express.Router();
router.get("/", LoanRecordController.getAllRecord);
router.post(
  "/",
  validateSchema(Schemas.loan.create, "body"),
  LoanRecordController.createRecord
);
router.put(
  "/",
  validateSchema(Schemas.loan.update, "body"),
  LoanRecordController.updateRecord
);
router.post(
  "/query",
  validateSchema(Schemas.loan.query, "body"),
  LoanRecordController.getRecordsByProperty
);

export = router;
