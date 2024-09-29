export interface IBook {
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date;
  publisher: string;
  pages: number;
  genre: string;
  records: ILoanRecord[];
}

import mongoose, { Schema, Document } from "mongoose";
import { ILoanRecord, LoanRecordSchema } from "./LoanRecord";
export interface IBookModel extends IBook, Document {}
const BookSchema = new Schema({
  barcode: { type: String, required: true, unique: true },
  cover: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  authors: { type: [String], required: true },
  description: { type: String, required: true },
  subjects: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  pages: { type: Number, required: true },
  genre: { type: String, required: true },
  records: [LoanRecordSchema],
});
export default mongoose.model<IBookModel>("Book", BookSchema);
