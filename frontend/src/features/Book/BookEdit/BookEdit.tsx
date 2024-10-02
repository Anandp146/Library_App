import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Book } from "../../../models/Book";
import { updateBook } from "../../../redux/slices/BookSlice";
import { AppDispatch } from "../../../redux/ReduxStore";
import axios from "axios";

interface BookEditProps {
  book: Book;
  onClose: () => void;
  onUpdate: (book: Book) => void;
}

const BookEdit: React.FC<BookEditProps> = ({ book, onClose, onUpdate }) => {
  const dispatch: AppDispatch = useDispatch();

  // Initialize form data state
  const [formData, setFormData] = useState({
    barcode: book.barcode || "",
    cover: book.cover || "",
    title: book.title || "",
    authors: book.authors?.join(", ") || "",
    description: book.description || "",
    subjects: book.subjects?.join(", ") || "",
    publicationDate: book.publicationDate
      ? new Date(book.publicationDate).toISOString().split("T")[0]
      : "",
    publisher: book.publisher || "",
    pages: book.pages || 0,
    genre: book.genre || "",
  });

  // Effect to set form data when the book prop changes
  useEffect(() => {
    setFormData({
      barcode: book.barcode || "",
      cover: book.cover || "",
      title: book.title || "",
      authors: book.authors?.join(", ") || "",
      description: book.description || "",
      subjects: book.subjects?.join(", ") || "",
      publicationDate: book.publicationDate
        ? new Date(book.publicationDate).toISOString().split("T")[0]
        : "",
      publisher: book.publisher || "",
      pages: book.pages || 0,
      genre: book.genre || "",
    });
  }, [book]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBook: Book = {
      _id: book._id, // Assuming _id is required by your backend
      barcode: formData.barcode.trim(),
      cover: formData.cover.trim() || "", // Ensure cover is a string
      title: formData.title.trim(),
      authors: formData.authors.split(",").map((author) => author.trim()), // Array
      description: formData.description.trim(),
      subjects: formData.subjects.split(",").map((subject) => subject.trim()), // Array
      // Ensure publicationDate is a string or a Date object, not null
      publicationDate: formData.publicationDate
        ? new Date(formData.publicationDate).toISOString()
        : new Date().toISOString(), // Provide a default date instead of null
      publisher: formData.publisher.trim(),
      pages: Number(formData.pages) || 0, // Ensure this is a number
      genre: formData.genre.trim(),
      records: [],
    };

    console.log("Updated book payload being sent:", updatedBook);

    try {
      // Make API call to update the book
      const response = await axios.put(
        `http://localhost:8000/book/${formData.barcode}`,
        updatedBook
      );
      console.log("Response from update:", response.data);

      // Dispatch the action to update the book in the store
      await dispatch(
        updateBook({ barcode: formData.barcode, book: updatedBook })
      ).unwrap();

      // Call onUpdate callback
      onUpdate(updatedBook);
      onClose();
    } catch (error: any) {
      console.error("Failed to update book:", error);
      alert(
        "Failed to update the book. Error: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto w-full">
      <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
            placeholder="Enter book title"
          />
        </div>

        {/* Barcode */}
        <div className="mb-4">
          <label htmlFor="barcode" className="block text-sm font-medium">
            Barcode
          </label>
          <input
            id="barcode"
            name="barcode"
            value={formData.barcode}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
            placeholder="Enter book barcode"
          />
        </div>

        {/* Authors */}
        <div className="mb-4">
          <label htmlFor="authors" className="block text-sm font-medium">
            Authors
          </label>
          <input
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Separate authors by commas"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter book description"
          />
        </div>

        {/* Other fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="publicationDate"
              className="block text-sm font-medium"
            >
              Publication Date
            </label>
            <input
              id="publicationDate"
              name="publicationDate"
              type="date"
              value={formData.publicationDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pages" className="block text-sm font-medium">
              Pages
            </label>
            <input
              id="pages"
              name="pages"
              type="number"
              value={formData.pages}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter number of pages"
            />
          </div>
        </div>

        {/* Publisher */}
        <div className="mb-4">
          <label htmlFor="publisher" className="block text-sm font-medium">
            Publisher
          </label>
          <input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter publisher name"
          />
        </div>

        {/* Genre */}
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium">
            Genre
          </label>
          <input
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter book genre"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookEdit;
