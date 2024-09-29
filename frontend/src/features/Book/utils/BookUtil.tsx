import { Book } from "../../../models/Book";
import { BookCheckOut } from "../CheckOut/BookCheckOut";
import { BookCheckin } from "../BookCheckIn/BookCheckin";
export function mapAuthorsToString(book: Book) {
  let authors = "";
  for (let author of book.authors) {
    authors + author;
    authors += ", ";
  }
  return authors.slice(0, authors.length - 2);
}

export function determineLoanModalContent(book: Book): JSX.Element {
  if (book.records.length === 0 || book.records[0].status === "AVAILABLE") {
    return <BookCheckOut />;
  }
  return <BookCheckin />;
}
