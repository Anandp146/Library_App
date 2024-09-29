import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { checkoutBook, setCurrentBook } from "../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../redux/slices/ModelSlice";
import { useNavigate } from "react-router-dom";

export const BookCheckOut: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  const book = useSelector((state: RootState) => state.book.currentBook);
  const bookState = useSelector((state: RootState) => state.book);
  const navigate = useNavigate();

  if (bookState.error) navigate("/catalog");

  const dispatch: AppDispatch = useDispatch();
  const libraryCardRef = useRef<HTMLInputElement>(null);
  const checkout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (book && user && libraryCardRef && libraryCardRef.current) {
      dispatch(
        checkoutBook({
          book,
          employee: user,
          libraryCard: libraryCardRef.current.value,
        })
      );
    }
    dispatch(setCurrentBook(undefined));
    dispatch(setDisplayLoan(false));
  };
  return (
    <div className="flex justify-center items-center 0 p-4">
      {book && user && (
        <form className="bg-blue-200 rounded-lg shadow-lg p-6 max-w-lg w-full">
          <h3 className="text-2xl font-bold mb-4">
            Loan Book Titled: {book.title}
          </h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="libraryCard"
            >
              Enter Patron's Library Card:
            </label>
            <input
              id="libraryCard"
              className="book-checkout-input w-full p-2 border border-gray-300 rounded"
              placeholder="Library Card ID"
              ref={libraryCardRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="employeeId"
            >
              Checkout Employee ID:
            </label>
            <input
              id="employeeId"
              className="book-checkout-input w-full p-2 border border-gray-300 rounded bg-gray-200"
              value={user._id}
              disabled
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={checkout}
          >
            Loan Book
          </button>
        </form>
      )}
    </div>
  );
};
