import { useSelector } from "react-redux";
import { Book } from "../../../models/Book";
import { RootState } from "../../../redux/ReduxStore";
import { useNavigate } from "react-router-dom";
import { BookCarousel } from "../../Book";

interface CatalogOverviewSectionProps {
  books: Book[];
  label: string;
}
export const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({
  books,
  label,
}) => {
  const bookState = useSelector((state: RootState) => state.book);
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(`catalog?genere=${label}&subject=${label}`);
  };
  return (
    // <div className="catalog-overview-section">
    //   <div className="catalog-overview-section-top">
    //     <h4>{label}</h4>
    //     <p className="catalog-overview-section-more" onClick={handleViewMore}>
    //       view more...
    //     </p>
    //   </div>
    //   {books.length > 0 && !bookState.loading && <BookCarousel books={books} />}
    // </div>
    <div className="w-full bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-2xl font-semibold">{label}</h4>
        <p
          className="text-blue-500 cursor-pointer underline"
          onClick={handleViewMore}
        >
          view more...
        </p>
      </div>
      {books.length > 0 && !bookState.loading && (
        <div className="w-full">
          <BookCarousel books={books} />
        </div>
      )}
    </div>
  );
};
