import React from "react";
import { Book } from "../../../models/Book";
import { BookHistory } from "../BookHistory/BookHistory";

interface HistoryProps {
  book: Book;
}

export const History: React.FC<HistoryProps> = ({ book }) => {
  return (
    <div className="max-w-4xl mx-auto p-2">
      <h2 className="text-3xl font-bold text-center mb-6">Loan History</h2>
      <div className="space-y-4">
        {book.records.map((record) => {
          return <BookHistory key={record._id} record={record} />;
        })}
      </div>
    </div>
  );
};
