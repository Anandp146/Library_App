"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateBooks = exports.queryBooks = exports.removeBook = exports.registerBook = exports.modifyBook = exports.findBookById = exports.findAllBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const libraryErrors_1 = require("../utils/libraryErrors");
// Retrieve all books
function findAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Book_1.default.find();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllBooks = findAllBooks;
function findBookById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let book = yield Book_1.default.findById(id);
            if (book)
                return book;
            throw new libraryErrors_1.BookDoesNotExistError("The specified book does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findBookById = findBookById;
// Modify a book
function modifyBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedBook = yield Book_1.default.findOneAndUpdate({ barcode: book.barcode }, book, { new: true });
            if (updatedBook)
                return updatedBook;
            throw new libraryErrors_1.BookDoesNotExistError("The book you are trying to modify does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.modifyBook = modifyBook;
// Register a new book
function registerBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newBook = new Book_1.default(book);
            return yield newBook.save();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.registerBook = registerBook;
// Remove a book by barcode
function removeBook(barcode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedBook = yield Book_1.default.findOneAndDelete({ barcode });
            if (deletedBook)
                return "Successfully deleted book";
            throw new libraryErrors_1.BookDoesNotExistError("The book you are trying to delete does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.removeBook = removeBook;
function queryBooks(page, limit, title, barcode, description, author, subject, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        let books = yield Book_1.default.find();
        let filtered = [];
        books.forEach((book) => {
            if (barcode) {
                if (book.barcode.toLowerCase().includes(barcode.toLowerCase()) &&
                    !filtered.some((b) => b["barcode"])) {
                    filtered.push(book);
                }
            }
            if (title) {
                if (book.title.toLowerCase().includes(title.toLowerCase()) &&
                    !filtered.some((b) => b["barcode"])) {
                    filtered.push(book);
                }
            }
            if (description) {
                if (book.description.toLowerCase().includes(description.toLowerCase()) &&
                    !filtered.some((b) => b["barcode"] === book.barcode)) {
                    filtered.push(book);
                }
            }
            if (author) {
                if (book.authors.some((a) => a.toLowerCase().includes(author.toLowerCase()) &&
                    !filtered.some((b) => b["barcode"] === book.barcode))) {
                    filtered.push(book);
                }
            }
            if (subject) {
                if (book.subjects.some((s) => s.toLowerCase().includes(subject.toLowerCase()) &&
                    !filtered.some((b) => b["barcode"] === book.barcode))) {
                    filtered.push(book);
                }
            }
            if (genre) {
                if (book.genre.toLowerCase() === genre.toLowerCase() &&
                    !filtered.some((b) => b["barcode"] === book.barcode)) {
                    filtered.push(book);
                }
            }
        });
        return paginateBooks(filtered, page, limit);
    });
}
exports.queryBooks = queryBooks;
function paginateBooks(books, page, limit) {
    let pageBooks = [];
    const pages = Math.ceil(books.length / Number(limit));
    if (Number(page) === pages) {
        const startPoint = (Number(page) - 1) * Number(limit);
        pageBooks = books.slice(startPoint);
    }
    else {
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
exports.paginateBooks = paginateBooks;
