"use strict";
// // controllers/TransactionController.ts
// import { Request, Response } from "express";
// import Transaction, { ITransaction } from "../daos/TransactionDao";
// // Get all transactions
// export const getAllTransactions = async (req: Request, res: Response) => {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// // Create a new transaction
// export const createTransaction = async (req: Request, res: Response) => {
//   const { userId, bookId, issueDate, returnDate /* Other fields */ } = req.body;
//   try {
//     const transaction: ITransaction = new Transaction({
//       userId,
//       bookId,
//       issueDate,
//       returnDate /* Other fields */,
//     });
//     await transaction.save();
//     res
//       .status(201)
//       .json({ message: "Transaction created successfully", transaction });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// // Get a transaction by ID
// export const getTransactionById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const transaction = await Transaction.findById(id);
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// // Update a transaction
// export const updateTransaction = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { userId, bookId, issueDate, returnDate /* Other fields */ } = req.body;
//   try {
//     const transaction = await Transaction.findByIdAndUpdate(
//       id,
//       { userId, bookId, issueDate, returnDate /* Other fields */ },
//       { new: true }
//     );
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// // Delete a transaction
// export const deleteTransaction = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const transaction = await Transaction.findByIdAndDelete(id);
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json({ message: "Transaction deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
