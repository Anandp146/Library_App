import BookDao, { IBookModel } from "../models/Book";
import { IBook } from "../models/Book";
import { IPagination } from "../models/Pagination";
import { BookDoesNotExistError } from "../utils/libraryErrors";
import { Types } from "mongoose";
// Retrieve all books
export async function findAllBooks(): Promise<IBookModel[]> {
  try {
    return await BookDao.find();
  } catch (error) {
    throw error;
  }
}

export async function findBookById(id: string): Promise<IBookModel> {
  try {
    let book = await BookDao.findById(id);
    if (book) return book;
    throw new BookDoesNotExistError("The specified book does not exist");
  } catch (error: any) {
    throw error;
  }
}

// Modify a book
export async function modifyBook(book: IBookModel): Promise<IBookModel> {
  try {
    // Save the updated book document
    const updatedBook = await book.save();

    return updatedBook;
  } catch (error: any) {
    console.error("Error modifying book:", error);
    throw error;
  }
}

// Register a new book
export async function registerBook(book: IBook): Promise<IBookModel> {
  try {
    const newBook = new BookDao(book);
    return await newBook.save();
  } catch (error) {
    throw error;
  }
}

// Remove a book by barcode
export async function removeBook(barcode: string): Promise<string> {
  try {
    const deletedBook = await BookDao.findOneAndDelete({ barcode });
    if (deletedBook) return "Successfully deleted book";
    throw new BookDoesNotExistError(
      "The book you are trying to delete does not exist"
    );
  } catch (error) {
    throw error;
  }
}

export async function queryBooks(
  page: number,
  limit: number,
  title?: string,
  barcode?: string,
  description?: string,
  author?: string,
  subject?: string,
  genre?: string
): Promise<IPagination<IBookModel>> {
  let books: IBookModel[] = await BookDao.find();
  let filtered: IBookModel[] = [];
  books.forEach((book) => {
    if (barcode) {
      if (
        book.barcode.toLowerCase().includes(barcode.toLowerCase()) &&
        !filtered.some((b) => b["barcode"])
      ) {
        filtered.push(book);
      }
    }
    if (title) {
      if (
        book.title.toLowerCase().includes(title.toLowerCase()) &&
        !filtered.some((b) => b["barcode"])
      ) {
        filtered.push(book);
      }
    }
    if (description) {
      if (
        book.description.toLowerCase().includes(description.toLowerCase()) &&
        !filtered.some((b) => b["barcode"] === book.barcode)
      ) {
        filtered.push(book);
      }
    }
    if (author) {
      if (
        book.authors.some(
          (a) =>
            a.toLowerCase().includes(author.toLowerCase()) &&
            !filtered.some((b) => b["barcode"] === book.barcode)
        )
      ) {
        filtered.push(book);
      }
    }
    if (subject) {
      if (
        book.subjects.some(
          (s) =>
            s.toLowerCase().includes(subject.toLowerCase()) &&
            !filtered.some((b) => b["barcode"] === book.barcode)
        )
      ) {
        filtered.push(book);
      }
    }
    if (genre) {
      if (
        book.genre.toLowerCase() === genre.toLowerCase() &&
        !filtered.some((b) => b["barcode"] === book.barcode)
      ) {
        filtered.push(book);
      }
    }
  });
  return paginateBooks(filtered, page, limit);
}

export function paginateBooks(
  books: IBookModel[],
  page: number,
  limit: number
): IPagination<IBookModel> {
  let pageBooks: IBookModel[] = [];
  const pages = Math.ceil(books.length / Number(limit));
  if (Number(page) === pages) {
    const startPoint = (Number(page) - 1) * Number(limit);
    pageBooks = books.slice(startPoint);
  } else {
    const startPoint = (Number(page) - 1) * Number(limit);
    const endPoint = startPoint + Number(limit);
    pageBooks = books.slice(startPoint, endPoint);
  }

  const pageObject = {
    totalCount: books.length,
    currentPage: Number(page),
    totalPages: pages,
    limit: Number(limit),
    pageCount: pageBooks.length,
    items: pageBooks,
  };
  return pageObject;
}
