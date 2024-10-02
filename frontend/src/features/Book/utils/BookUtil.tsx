// src/features/Book/BookUtil.tsx

import { Book } from "../../../models/Book";
import { BookCheckOut } from "../CheckOut/BookCheckOut";
import { BookCheckin } from "../BookCheckIn/BookCheckin";

export function mapAuthorsToString(book: Book): string {
  if (!Array.isArray(book.authors)) {
    console.warn("book.authors is not an array:", book.authors);
    return "";
  }
  return book.authors.join(", ");
}

export function determineLoanModalContent(book: Book): JSX.Element {
  if (book.records.length === 0 || book.records[0].status === "AVAILABLE") {
    return <BookCheckOut />;
  }
  return <BookCheckin />;
}
