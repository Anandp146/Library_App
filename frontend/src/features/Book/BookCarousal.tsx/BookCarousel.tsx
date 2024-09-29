import { useState } from "react";
import { Book } from "../../../models/Book";
import { BookCard } from "../BookCard/BookCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";

interface BookCarouselProps {
  books: Book[];
}

const ErrorComponent: React.FC = () => {
  const error = useSelector((state: RootState) => state.book.error);

  return error ? <div className="error-message">{error}</div> : null;
};

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [order, setOrder] = useState<Book[]>(books);

  const moveLeft = () => {
    let item = order[0];
    let reordered = order.slice(1, order.length);
    reordered.push(item);
    setOrder(reordered);
  };
  const moveRight = () => {
    let item = order[order.length - 1];
    let reordered = order.slice(0, order.length - 1);
    reordered = [item, ...reordered];
    setOrder(reordered);
  };
  return (
    // <div>
    //   <div onClick={moveLeft}>{"<"}</div>
    //   <div onClick={moveRight}>{">"}</div>
    //   {order.map((item) => (
    //     <BookCard key={item.barcode} book={item} />
    //   ))}
    // </div>
    <div className="relative w-full">
      <button
        onClick={moveLeft}
        className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
      >
        {"<"}
      </button>
      <div className="flex overflow-hidden py-4 space-x-4">
        {order.map((item) => (
          <div
            key={item.barcode}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
          >
            <ErrorComponent />
            <BookCard book={item} />
          </div>
        ))}
      </div>
      <button
        onClick={moveRight}
        className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
      >
        {">"}
      </button>
    </div>
  );
};
