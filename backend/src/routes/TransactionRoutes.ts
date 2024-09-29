// import express from "express";
// import {
//   getAllTransactions,
//   createTransaction,
//   getTransactionById,
//   updateTransaction,
//   deleteTransaction,
// } from "../controllers/Transaction";
// // import authenticateToken from "../middlewares/Auth";
// import { Schemas, validateSchema } from "../middlewares/validation";

// const router = express.Router();

// // Apply the authenticateToken middleware to all routes
// // router.use(authenticateToken);

// // Route to get all transactions
// router.get("/", getAllTransactions);

// // Route to create a new transaction
// router.post(
//   "/",
//   validateSchema(Schemas.transaction.create, "body"),
//   createTransaction
// );

// // Route to get a transaction by ID
// router.get(
//   "/:id",
//   validateSchema(Schemas.transaction.update, "params"),
//   getTransactionById
// );

// // Route to update a transaction
// router.put(
//   "/:id",
//   validateSchema(Schemas.transaction.update, "body"),
//   updateTransaction
// );

// // Route to delete a transaction
// router.delete(
//   "/:id",
//   validateSchema(Schemas.transaction.update, "params"),
//   deleteTransaction
// );

// export default router;
