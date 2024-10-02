import { Request, Response } from "express";
import {
  findAllBooks,
  registerBook,
  modifyBook,
  removeBook,
  queryBooks,
} from "../services/BookService";
import Book, { IBook, IBookModel } from "../models/Book";
import { BookDoesNotExistError } from "../utils/libraryErrors";

// Function to retrieve all books
async function getAllBooks(req: Request, res: Response): Promise<void> {
  try {
    const books = await findAllBooks();
    res.status(200).json({
      message: "Retrieved all books",
      count: books.length,
      books,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Unable to retrieve books at this time",
      error: error.message,
    });
  }
}

// Function to create a new book
async function createBook(req: Request, res: Response): Promise<void> {
  const book: IBook = req.body;
  try {
    const savedBook = await registerBook(book);
    res.status(201).json({
      message: "Book created successfully",
      book: savedBook,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Unable to save book at this time",
      error: error.message,
    });
  }
}

// Function to update an existing book
async function updateBook(req: Request, res: Response) {
  const { barcode } = req.params;
  const bookData = req.body;
  try {
    // Validate if the bookData contains all required fields
    if (!bookData || Object.keys(bookData).length === 0) {
      return res.status(422).json({ message: "No data provided to update" });
    }

    // Update the book by barcode
    const updatedBook = await Book.findOneAndUpdate({ barcode }, bookData, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res
      .status(202)
      .json({ message: "Book Updated Successfully ", updatedBook });
  } catch (error: any) {
    console.error(error);
    if (error instanceof BookDoesNotExistError) {
      res
        .status(404)
        .json({ message: "annot update bok that does not exit", error });
    } else {
      res
        .status(500)
        .json({ message: "Unable to update book at this time", error });
    }
  }
}

// Function to delete a book by barcode
async function deleteBook(req: Request, res: Response): Promise<void> {
  const { barcode } = req.params;
  try {
    const message = await removeBook(barcode);
    res.status(202).json({ message });
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError) {
      res.status(404).json({
        message: "Cannot delete book that does not exist",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unable to delete book at this time",
        error: error.message,
      });
    }
  }
}
async function searchForBooksByQuery(req: Request, res: Response) {
  let {
    title,
    barcode,
    author,
    description,
    subject,
    genre,
    page = 1,
    limit = 25,
  } = req.query;

  let books = await queryBooks(
    Number(page),
    Number(limit),
    title as string,
    barcode as string,
    description as string,
    author as string,
    subject as string,
    genre as string
  );
  res.status(200).json({ message: "Retrieved books from query", page: books });
}
export default {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  searchForBooksByQuery,
};
