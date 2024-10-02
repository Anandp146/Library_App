import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/ReduxStore";
import { BookInfo } from "../BookInfo/BookInfo";
import { BookSubject } from "../BookSubject/BookSubject";
import { BookAddInfo } from "../BookAddInfo/BookAddInfo";
import { History } from "../History/History";
import BookEdit from "../BookEdit/BookEdit";
import {
  deleteBook,
  loadBookByBarcode,
  updateBook,
  updateCurrentBook,
} from "../../../redux/slices/BookSlice";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../models/Book";

export const BookOverview: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const bookState = useSelector((state: RootState) => state.book);
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );

  const [isEditing, setIsEditing] = useState(false);
  const currentBook = bookState.currentBook;
  const handleDelete = async (id: string) => {
    if (typeof id !== "string") {
      console.error("Invalid ID type:", id);
      return;
    }

    console.log("Attempting to delete book with ID:", id);
    try {
      await dispatch(deleteBook(id)).unwrap();
      console.log(`Book with ID ${id} deleted successfully.`);
      navigate("/catalog"); // Redirect after successful deletion
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    // Validate the updatedBook object before proceeding
    if (!updatedBook || !updatedBook.barcode) {
      console.error("Invalid book data provided:", updatedBook);
      return;
    }

    try {
      // Prepare the formatted book payload
      const formattedBook: Book = {
        ...updatedBook,
        authors: Array.isArray(updatedBook.authors)
          ? updatedBook.authors.map((author) => author.trim())
          : [], // Fallback to an empty array if authors is not defined
        subjects: Array.isArray(updatedBook.subjects)
          ? updatedBook.subjects.map((subject) => subject.trim())
          : [], // Fallback to an empty array if subjects is not defined
        publicationDate: updatedBook.publicationDate
          ? new Date(updatedBook.publicationDate).toISOString() // Handle valid date or string
          : new Date().toISOString(), // Fallback to the current date if it's null
        pages: Number(updatedBook.pages) || 0, // Default to 0 if pages is not a valid number
      };

      console.log("Formatted Book Payload:", formattedBook);

      // Dispatch the update book action
      const updatedData = await dispatch(
        updateBook({ barcode: formattedBook.barcode, book: formattedBook })
      ).unwrap();

      // After successful update, re-fetch the book details
      dispatch(loadBookByBarcode(formattedBook.barcode));
      setIsEditing(false); // Close the modal
      console.log("Book updated successfully:", updatedData);
    } catch (error: any) {
      // Handle specific error types if needed
      if (error.response) {
        console.error("Failed to update book:", error.response.data);
        if (error.response.status === 422) {
          console.error("Validation error:", error.response.data);
        }
      } else {
        console.error("Unexpected error occurred while updating book:", error);
      }
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4">
          {currentBook && !bookState.loading ? (
            <>
              <div className="p-4 rounded-lg shadow-md bg-white">
                <BookInfo book={currentBook} />
              </div>
              <div className="p-4 rounded-lg shadow-md bg-white">
                <BookSubject subjects={currentBook.subjects} />
              </div>
              <div className="p-4 rounded-lg shadow-md bg-white">
                <BookAddInfo book={currentBook} />
              </div>
              {user?.type === "EMPLOYEE" && (
                <div className="p-4 rounded-lg shadow-md bg-white">
                  <History book={currentBook} />
                </div>
              )}
              {user?.type === "ADMIN" && (
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white p-2 rounded transition duration-200 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(currentBook.barcode)}
                    className="bg-red-500 text-white p-2 rounded transition duration-200 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500">
              {bookState.loading
                ? "Loading book details..."
                : "No book selected."}
            </div>
          )}
        </div>
      </div>
      {isEditing && currentBook && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <BookEdit
              book={currentBook}
              onClose={() => setIsEditing(false)}
              onUpdate={handleUpdateBook}
            />
          </div>
        </div>
      )}
    </div>
  );
};
