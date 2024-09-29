import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../redux/slices/BookSlice";
import { CreateBookPayload } from "../../models/Book";

const AddBook: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CreateBookPayload>({
    barcode: "",
    cover: "",
    title: "",
    authors: [],
    description: "",
    subjects: [],
    publicationDate: new Date().toISOString().split("T")[0], // Set default date to today
    publisher: "",
    pages: 0,
    genre: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(",").map((author) => author.trim());
    setFormData((prevData) => ({
      ...prevData,
      authors: value,
    }));
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(",").map((subject) => subject.trim());
    setFormData((prevData) => ({
      ...prevData,
      subjects: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting book data:", formData); // Debugging line
    try {
      await dispatch(createBook(formData)).unwrap();
      // Clear the form or perform other success actions here
      setFormData({
        barcode: "",
        cover: "",
        title: "",
        authors: [],
        description: "",
        subjects: [],
        publicationDate: new Date().toISOString().split("T")[0],
        publisher: "",
        pages: 0,
        genre: "",
      });
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add a New Book
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="barcode">
              Barcode
            </label>
            <input
              type="text"
              name="barcode"
              onChange={handleInputChange}
              placeholder="Barcode"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="cover">
              Cover URL
            </label>
            <input
              type="text"
              name="cover"
              onChange={handleInputChange}
              placeholder="Cover URL"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
              placeholder="Title"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="authors">
              Authors (comma separated)
            </label>
            <input
              type="text"
              name="authors"
              onChange={handleAuthorsChange}
              placeholder="Authors"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleInputChange}
              placeholder="Description"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="subjects">
              Subjects (comma separated)
            </label>
            <input
              type="text"
              name="subjects"
              onChange={handleSubjectsChange}
              placeholder="Subjects"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-gray-700"
              htmlFor="publicationDate"
            >
              Publication Date
            </label>
            <input
              type="date"
              name="publicationDate"
              onChange={handleInputChange}
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="publisher">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              onChange={handleInputChange}
              placeholder="Publisher"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="pages">
              Pages
            </label>
            <input
              type="number"
              name="pages"
              onChange={handleInputChange}
              placeholder="Pages"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700" htmlFor="genre">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              onChange={handleInputChange}
              placeholder="Genre"
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg focus:outline-none"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
