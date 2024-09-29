import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { checkinBook, setCurrentBook } from "../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../redux/slices/ModelSlice";

export const BookCheckin: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  const book = useSelector((state: RootState) => state.book.currentBook);
  const dispatch: AppDispatch = useDispatch();
  const checkin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (book && user) {
      dispatch(
        checkinBook({
          book,
          employee: user,
        })
      );
    }
    dispatch(setDisplayLoan(false));
    dispatch(setCurrentBook(undefined));
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {book && user ? (
        <form className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Check In Book Titled: {book.title}
          </h3>
          <div className="mb-4">
            <h4 className="text-xl font-bold mb-2 text-gray-700">
              Employee ID:
            </h4>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user._id}
              disabled
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            onClick={checkin}
          >
            Check In Book
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">No book selected for check-in.</p>
        </div>
      )}
    </div>
  );
};
