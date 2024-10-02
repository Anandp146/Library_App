import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/ReduxStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadBookByBarcode } from "../../redux/slices/BookSlice";
import { BookOverview } from "../../features/Book";

export default function Resource() {
  const dispatch: AppDispatch = useDispatch();
  const bookState = useSelector((state: RootState) => state.book);
  const { barcode } = useParams<{ barcode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (barcode) {
      dispatch(loadBookByBarcode(barcode));
    }
  }, [barcode, dispatch]);

  useEffect(() => {
    if (bookState.error) {
      navigate("/catalog");
    }
  }, [bookState.error, navigate]);

  // Check if the book is loading, if so, show a loading message
  if (bookState.loading) {
    return <div>Loading book details...</div>;
  }

  // Check if no book is found (handle this as necessary)
  if (!bookState.currentBook) {
    return <div>No book found with the provided barcode.</div>;
  }

  return (
    <div className="">
      <div className="">
        <BookOverview />
      </div>
    </div>
  );
}
