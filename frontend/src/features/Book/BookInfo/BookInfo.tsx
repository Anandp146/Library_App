import React from "react";
import "./BookInfo.css";
import { Book } from "../../../models/Book";
import { mapAuthorsToString } from "../utils/BookUtil";
interface BookInfoProps {
  book: Book;
}
export const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  return (
    // <div className="book-info">
    //   <div className="book-info-container">
    //     <img className="book-info-cover" src={book.cover} />
    //     <div>
    //       <h2>{book.title}</h2>
    //       <h3>{mapAuthorsToString(book)}</h3>
    //       <p>{book.description}</p>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white rounded-lg p-6 md:flex md:items-center md:justify-between shadow-lg">
      <div className="md:flex md:items-center">
        <img
          className="w-48 h-72 md:mr-10 md:w-60 md:h-auto rounded-lg shadow-md"
          src={book.cover}
          alt="Book Cover"
        />
        <div className="mt-4 mx-6 md:mt-0 md:flex-grow">
          <h2 className="text-2xl font-serif font-semibold text-gray-800">
            {book.title}
          </h2>
          <h3 className="text-lg font-medium text-gray-600">
            {mapAuthorsToString(book)}
          </h3>
          <p className="mt-2 text-justify text-gray-700">{book.description}</p>
        </div>
      </div>
    </div>
  );
};
