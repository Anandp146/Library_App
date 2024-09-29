// import { useNavigate } from "react-router-dom";
// import { Book } from "../../../models/Book";
// import { mapAuthorsToString } from "../utils/BookUtil";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../redux/ReduxStore";
// import { useEffect, useState } from "react";
// import { setCurrentBook } from "../../../redux/slices/BookSlice";
// import { setDisplayLoan } from "../../../redux/slices/ModelSlice";

// interface BookCardProps {
//   book: Book;
// }

// export const BookCard: React.FC<BookCardProps> = ({ book }) => {
// const navigate = useNavigate();

// const user = useSelector(
//   (state: RootState) => state.authentication.loggedInUser
// );
// const dispatch: AppDispatch = useDispatch();
// const [available, setAvailable] = useState<boolean>(() => {
//   if (book.records.length === 0) return true;
//   return book.records[0].status === "AVAILABLE";
// });
// const [buttonClass, setButtonClass] = useState<string>("");
// const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.stopPropagation();
//   if (user?.type === "EMPLOYEE") {
//     dispatch(setCurrentBook(book));
//     dispatch(setDisplayLoan(true));
//   }
// };
// const displayBook = () => {
//   navigate(`/resources/${book.barcode}`);
// };

//   useEffect(() => {
//     let baseClass = "w-full py-2 rounded-md mt-4 text-center ";
//     if (available) {
//       baseClass += "bg-green-500 text-white hover:bg-green-600 ";
//     } else {
//       baseClass += "bg-red-500 text-white hover:bg-red-600 ";
//     }
//     if (user && user.type === "EMPLOYEE") {
//       baseClass += available ? "border-green-700" : "border-red-700";
//     }
//     setButtonClass(baseClass);
//   }, [available, user?.type, book.records]);

//   return (
//     <div
//       className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
//       id="book-card"
//       onClick={displayBook}
//     >
//       <img
//         src={book.cover}
//         alt={book.title}
//         className="w-full h-48 object-cover rounded-t-lg mb-4"
//       />
//       <div className="flex-1">
//         <h1 className="text-xl font-bold mb-2">{book.title}</h1>
//         <h3 className="text-md text-gray-600 mb-2">
//           {mapAuthorsToString(book)}
//         </h3>
//         <p className="text-sm text-gray-700 line-clamp-3">{book.description}</p>
//       </div>
//       <button className={buttonClass} onClick={handleLoan}>
//         Status: {available ? "AVAILABLE" : "UNAVAILABLE"}
//       </button>
//     </div>
//   );
// };
import { useNavigate } from "react-router-dom";
import { Book } from "../../../models/Book";
import { mapAuthorsToString } from "../utils/BookUtil";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { useEffect, useState } from "react";
import { setCurrentBook } from "../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../redux/slices/ModelSlice";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  const currentBook = useSelector((state: RootState) => state.book.currentBook);
  const dispatch: AppDispatch = useDispatch();

  const [buttonClass, setButtonClass] = useState<string>("");

  const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (user?.type === "EMPLOYEE") {
      dispatch(setCurrentBook(book));
      dispatch(setDisplayLoan(true));
    }
  };

  const displayBook = () => {
    navigate(`/resource/${book.barcode}`);
  };

  const isAvailable =
    book.records.length === 0 || book.records[0].status === "AVAILABLE";

  useEffect(() => {
    let baseClass = "w-full py-2 rounded-md mt-4 text-center ";
    if (isAvailable) {
      baseClass += "bg-green-500 text-white hover:bg-green-600 ";
    } else {
      baseClass += "bg-red-500 text-white hover:bg-red-600 ";
    }
    if (user && user.type === "EMPLOYEE" && isAvailable) {
      baseClass += "border-green-700";
    } else if (user && user.type === "EMPLOYEE" && !isAvailable) {
      baseClass += "border-red-700";
    }
    setButtonClass(baseClass);
  }, [isAvailable, user?.type]);

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
      id="book-card"
      onClick={displayBook}
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-2">{book.title}</h1>
        <h3 className="text-md text-gray-600 mb-2">
          {mapAuthorsToString(book)}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-3">{book.description}</p>
      </div>
      <button className={buttonClass} onClick={handleLoan}>
        Status: {isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
      </button>
    </div>
  );
};
