import { Book } from "../../../models/Book";

interface BookAddInfoProps {
  book: Book;
}
export const BookAddInfo: React.FC<BookAddInfoProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">
        Additional Information about: {book.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">Published By:</h4>
          <p className="text-gray-700">{book.publisher}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-1">Published On:</h4>
          <p className="text-gray-700">
            {new Date(book.publicationDate).toDateString()}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-1">ISBN:</h4>
          <p className="text-gray-700">{book.barcode}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-1">Number of Pages:</h4>
          <p className="text-gray-700">{book.pages}</p>
        </div>
      </div>
    </div>
  );
};
