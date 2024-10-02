import { LoanRecord } from "./LoanRecords";
import { User } from "./User";

export type Book = {
  _id: string;
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date | string | null; // Accept both Date and string types
  publisher: string;
  pages: number;
  genre: string;
  records: LoanRecord[];
};
export type CreateBookPayload = {
  barcode: string; // Ensure this is a valid string
  cover: string; // Ensure this is a valid URL string
  title: string; // Title must be a non-empty string
  authors: string[]; // Authors should be an array of non-empty strings
  description: string; // Description should be a non-empty string
  subjects: string[]; // Subjects should be an array of non-empty strings
  publicationDate: Date | string; // Ensure this is in a valid format (e.g., ISO string)
  publisher: string; // Ensure this is a non-empty string
  pages: number; // Ensure this is a valid number
  genre: string; // Ensure this is a non-empty string
};

export type CheckoutBookPayload = {
  book: Book;
  libraryCard: string;
  employee: User;
};

export type CheckinBookPayload = {
  book: Book;
  employee: User;
};
