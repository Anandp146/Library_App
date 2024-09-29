import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { useEffect, useState } from "react";
import { fetchAllBooks } from "../../../redux/slices/BookSlice";
import { BookCard } from "../../Book";
import { generateRandomGenres } from "../utils/CatalogUtils";

export const CatalogOverview: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;
  const [genres, setGenres] = useState<string[]>(() => {
    return generateRandomGenres();
  });
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(bookState.books.length / booksPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(bookState.books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = bookState.books.slice(
    startIndex,
    startIndex + booksPerPage
  );

  return (
    <div className="container mx-auto py-8 px-4">
      {bookState.books.length > 0 && !bookState.loading ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to our library, we currently have {bookState.books.length}{" "}
            books.
          </h2>
          <h4 className="text-lg mb-4 text-center">
            Browse our collection below, or search for something using the top
            navigation bar.
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.map((book) => (
              <BookCard key={book.barcode} book={book} />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-4 py-2 rounded-md focus:outline-none ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-indigo-600 border border-indigo-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      )}
    </div>
  );
};
