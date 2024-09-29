import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const CatalogAdvSearch: React.FC = () => {
  const navigate = useNavigate();
  const isbnRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);

  const search = () => {
    let query = "";
    if (isbnRef && isbnRef.current && isbnRef.current.value !== "")
      query += `?barcode-$(isbnRef.current.value)`;
    if (titleRef && titleRef.current && titleRef.current.value !== "") {
      query +=
        query === ""
          ? `?title-"${titleRef.current.value}`
          : `&title-"${titleRef.current.value}`;
    }
    if (authorRef && authorRef.current && authorRef.current.value !== "") {
      query +=
        query === ""
          ? `?author-"${authorRef.current.value}`
          : `&author-"${authorRef.current.value}`;
    }
    if (
      descriptionRef &&
      descriptionRef.current &&
      descriptionRef.current.value !== ""
    ) {
      query +=
        query === ""
          ? `?description-"${descriptionRef.current.value}`
          : `&description-"${descriptionRef.current.value}`;
    }
    if (subjectRef && subjectRef.current && subjectRef.current.value !== "") {
      query +=
        query === ""
          ? `?subject-"${subjectRef.current.value}`
          : `&subject-"${subjectRef.current.value}`;
    }
    if (genreRef && genreRef.current && genreRef.current.value !== "") {
      query +=
        query === ""
          ? `?genre-"${genreRef.current.value}`
          : `&genre-"${genreRef.current.value}`;
    }

    navigate(`/catalog${query}`);
  };
  return (
    // <div className="catalog-advanced-search">
    //   <h2>Advanced Book Search</h2>
    //   <p>
    //     Fill in as many or little fields to narraow down your search results
    //   </p>
    //   <form action="" className="catalog-advanced-search-form">
    //     <div className="catalog-advanced-form-input-group">
    //       <p>ISBN</p>
    //       <input
    //         id="isbn"
    //         className="catalog-advanced-form-input"
    //         placeholder={"ISBN"}
    //         ref={isbnRef}
    //       />
    //     </div>
    //     <div className="catalog-advanced-form-input-group">
    //       <p>Title</p>
    //       <input
    //         id="title"
    //         className="catalog-advanced-form-input"
    //         placeholder={"Title"}
    //         ref={titleRef}
    //       />
    //     </div>
    //     <div className="catalog-advanced-form-input-group">
    //       <p>Author</p>
    //       <input
    //         id="author"
    //         className="catalog-advanced-form-input"
    //         placeholder={"Author"}
    //         ref={authorRef}
    //       />
    //     </div>
    //     <div className="catalog-advanced-form-input-group">
    //       <p>Description</p>
    //       <input
    //         id="description"
    //         className="catalog-advanced-form-input"
    //         placeholder={"Description"}
    //         ref={descriptionRef}
    //       />
    //     </div>
    //     <div className="catalog-advanced-form-input-group">
    //       <p>Subject</p>
    //       <input
    //         id="subject"
    //         className="catalog-advanced-form-input"
    //         placeholder={"Subject"}
    //         ref={subjectRef}
    //       />
    //     </div>
    //     <div className="catalog-advanced-form-input-group">
    //       <p>Genre</p>
    //       <input
    //         id="genre"
    //         className="catalog-advanced-form-input"
    //         placeholder={"Genre"}
    //         ref={genreRef}
    //       />
    //     </div>
    //   </form>
    //   <button className="catalog-advanced-search-button" onClick={search}>
    //     Search
    //   </button>
    // </div>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        Advanced Book Search
      </h2>
      <p className="mb-4 text-center">
        Fill in any fields to narrow down your search results
      </p>
      <form className="flex flex-wrap justify-center items-center space-x-3 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="isbn" className="text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            id="isbn"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-28"
            placeholder="ISBN"
            ref={isbnRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-28"
            placeholder="Title"
            ref={titleRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="author" className="text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            id="author"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-28"
            placeholder="Author"
            ref={authorRef}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-28"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            id="subject"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-28"
            placeholder="Subject"
            ref={subjectRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="genre" className="text-sm font-medium text-gray-700">
            Genre
          </label>
          <input
            id="genre"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-28"
            placeholder="Genre"
            ref={genreRef}
          />
        </div>
      </form>
      <div className="mt-6 flex justify-center">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={search}
        >
          Search
        </button>
      </div>
    </div>
  );
};
