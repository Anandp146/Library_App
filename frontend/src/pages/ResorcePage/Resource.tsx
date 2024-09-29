import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/ReduxStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadBookByBarcode } from "../../redux/slices/BookSlice";
import { BookOverview } from "../../features/Book";

export default function Resource() {
  const dispatch: AppDispatch = useDispatch();
  const bookState = useSelector((state: RootState) => state.book);
  const { barcode } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (barcode) {
      dispatch(loadBookByBarcode(barcode));
    }
    if (bookState.error) navigate("/catalog");
  }, [bookState.error, barcode]);
  return (
    <div className="">
      <div className="">
        <BookOverview />
      </div>
    </div>
  );
}
