import { Express, Request, Response } from "express";
import authRoutes from "./AuthRoutes";
import userRoutes from "./UserRoutes";
import bookRoutes from "./BookRoutes";
import loanRoutes from "./LoanRecordRoutes";
// import transactionRoutes from "./TransactionRoutes";
import cardRoutes from "./LibraryCardRoutes";
export function registerRoutes(app: Express) {
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/book", bookRoutes);
  app.use("/card", cardRoutes);
  app.use("/loan", loanRoutes);
  // app.use("/transactions", transactionRoutes);
}
