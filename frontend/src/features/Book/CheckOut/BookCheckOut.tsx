import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { checkoutBook, setCurrentBook } from "../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../redux/slices/ModelSlice";
import { useNavigate } from "react-router-dom";
const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <button
      type="button"
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
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
  const closeModal = () => {
    dispatch(setCurrentBook(undefined));
    dispatch(setDisplayLoan(false));
  };
  return (
    <div className="flex justify-center items-center  p-4  bg-opacity-50">
      {book && user && (
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          {/* Close button */}
          <CloseButton onClose={closeModal} />

          {/* Modal content */}
          <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">
            Loan Book: {book.title}
          </h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="libraryCard"
            >
              Patron's Library Card:
            </label>
            <input
              id="libraryCard"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Library Card ID"
              ref={libraryCardRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="employeeId"
            >
              {user.type.charAt(0).toUpperCase() +
                user.type.toLowerCase().slice(1)}{" "}
              ID:
            </label>
            <input
              id="employeeId"
              className="w-full p-2 border border-gray-300 rounded bg-gray-200"
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
        </div>
      )}
    </div>
  );
};
