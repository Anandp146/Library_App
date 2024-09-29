import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { queryBooks } from "../../../redux/slices/BookSlice";
import { BookCard } from "../../Book";
import { CatalogAdvSearch } from "../CatalogAdvSearch/CatalogAdvSearch";
import { CatalogNavigator } from "../CatalogNavigation/CatalogNavigator";

export const CatalogSearch: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [location.search]);
  return (
    // <div className="catalog-search">
    //   <div className="catalog-search-advanced-search-section"></div>
    //   {!bookState.loading ? (
    //     <>
    //       <h2>
    //         Displaying {bookState.pagingInformation?.pageCount} books out of{" "}
    //         {bookState.pagingInformation?.totalCount}
    //       </h2>
    //       <div className="catalog-search-item-area">
    //         {bookState.books.map((book) => (
    //           <BookCard key={book.barcode} book={book} />
    //         ))}
    //       </div>
    //       <div className="catalog-search-pages"></div>
    //     </>
    //   ) : (
    //     <></>
    //   )}
    // </div>
    <div className="catalog-search container mx-auto px-4 py-8">
      <div className="catalog-search-advanced-search-section mb-8">
        {/* Your advanced search section content goes here */}
        <CatalogAdvSearch />
      </div>
      {!bookState.loading && bookState.books.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Displaying {bookState.pagingInformation?.pageCount} books out of{" "}
            {bookState.pagingInformation?.totalCount}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookState.books.map((book) => (
              <BookCard key={book.barcode} book={book} />
            ))}
          </div>
          <div className="catalog-search-pages mt-8">
            <CatalogNavigator />
          </div>
        </>
      )}
      {bookState.loading && (
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      )}
      {!bookState.loading && bookState.books.length === 0 && (
        <div className="text-center">
          <p className="text-lg">No books found.</p>
        </div>
      )}
    </div>
  );
};
