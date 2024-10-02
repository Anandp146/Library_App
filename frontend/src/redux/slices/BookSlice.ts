import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import {
  Book,
  CheckinBookPayload,
  CheckoutBookPayload,
} from "../../models/Book";
import { PageInfo } from "../../models/Page";

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
  errorMessage: string | null;
  currentBook: Book | undefined;
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: false,
  error: false,
  errorMessage: null,
  books: [],
  currentBook: undefined,
  pagingInformation: null,
};
// Create a book
export const createBook = createAsyncThunk(
  "book/create",
  async (book: Book, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8000/book/", book);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Failed to create book"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
// export const updateBook = createAsyncThunk(
//   "book/updateBook",
//   async (
//     { barcode, book }: { barcode: string; book: Book },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/book/${barcode}`,
//         book,
//         {
//           headers: {
//             "Content-Type": "application/json", // Specify content type if necessary
//           },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error("Error during book update:", error.response.data);
//       return rejectWithValue(error.response.data); // This returns the error to the component
//     }
//   }
// );
export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ barcode, book }: { barcode: string; book: Book }) => {
    const response = await axios.put(
      `http://localhost:8000/book/${barcode}`,
      book
    );
    return response.data;
  }
);

// Delete a book
export const deleteBook = createAsyncThunk<string, string>(
  "book/delete",
  async (id: string, thunkAPI) => {
    try {
      // Make the DELETE request
      await axios.delete(`http://localhost:8000/book/${id}`);

      return id; // Return the ID of the deleted book
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle known errors
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Failed to delete book"
        );
      }
      // Handle unknown errors
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllBooks = createAsyncThunk(
  "book/all",
  async (payload, thunkAPI) => {
    try {
      let req = await axios.get("http://localhost:8000/book/");
      return req.data.books;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const queryBooks = createAsyncThunk(
  "book/query",
  async (payload: string, thunkAPI) => {
    try {
      let req = await axios.get(`http://localhost:8000/book/query${payload}`);
      return req.data.page;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const checkoutBook = createAsyncThunk(
  "book/checkout",
  async (payload: CheckoutBookPayload, { rejectWithValue }) => {
    try {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);
      const getPatron = await axios.get(
        `http://localhost:8000/card/${payload.libraryCard}`
      );
      const patronId = getPatron.data.libraryCard.user._id;
      const record = {
        status: "LOANED",
        loanedDate: new Date(),
        dueDate: returnDate,
        patron: patronId,
        employeeOut: payload.employee._id,
        item: payload.book._id,
      };
      const loadReq = await axios.post("http://localhost:8000/loan", record);
      const loan = loadReq.data.record;
      return loan;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extracting serializable error information
        const errorMessage =
          error.response?.data?.message || error.message || "Unknown error";
        // Return the error message to be dispatched as part of the rejected action
        return rejectWithValue(errorMessage);
      } else {
        // For non-Axios errors, just throw them again to be caught by the global error handler
        throw error;
      }
    }
  }
);
export const checkinBook = createAsyncThunk(
  "book/checkin",
  async (payload: CheckinBookPayload, thunkAPI) => {
    try {
      let record = payload.book.records[0];

      let updatedRecord = {
        status: "AVAILABLE",
        loanedDate: record.loanedDate,
        dueDate: record.dueDate,
        returnedDate: new Date(),
        patron: record.patron,
        employeeOut: record.employeeOut,
        employeeIn: payload.employee._id,
        item: record.item,
        _id: record._id,
      };
      let loan = await axios.put("http://localhost:8000/loan/", updatedRecord);
      return loan.data.record;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loadBookByBarcode = createAsyncThunk(
  "book/:id",
  async (payload: string, thunkAPI) => {
    try {
      let res = await axios.get(
        `http://localhost:8000/book/query?barcode=${payload}`
      );
      let book = res.data.page.items[0];
      if (!book || book.barcode !== payload) {
        throw new Error();
      }
      return book;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updateCurrentBook: (state, action) => {
      // Update the current book in the store
      // if (state.currentBook?.barcode === action.payload.barcode) {
      //   state.currentBook = action.payload; // Update the current book with the new data
      // }
      state.currentBook = action.payload;
      // Optionally update the items list if needed
      const index = state.books.findIndex(
        (book) => book.barcode === action.payload.barcode
      );
      if (index !== -1) {
        state.books[index] = action.payload; // Update the book list too
      }
    },
    resetError(state) {
      state.error = false;
      state.errorMessage = null;
    },
    setCurrentBook(state, action: PayloadAction<Book | undefined>) {
      state = {
        ...state,
        currentBook: action.payload,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state, action) => {
      return {
        ...state,
        books: [],
        loading: true,
        error: false, // Reset error state on pending
      };
    });
    builder.addCase(queryBooks.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        books: [],
        // error: false, // Reset error state on pending
      };
    });
    builder.addCase(createBook.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.loading = false;
      const updatedBook = action.payload;
      state.books = state.books.map((book) =>
        book.barcode === updatedBook.barcode ? updatedBook : book
      );
      state.currentBook = updatedBook; // Ensure the currentBook is updated
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload as string; // Ensure you're capturing the error
    });
    builder.addCase(
      deleteBook.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((book) => book._id !== action.payload); // remove the book from the list
      }
    );
    builder.addCase(
      createBook.fulfilled,
      (state, action: PayloadAction<Book>) => {
        state.loading = false;
        state.books.push(action.payload); // Add the new book to the list
      }
    );
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload as string;
    });

    builder.addCase(checkoutBook.pending, (state, action) => {
      state = { ...state, loading: true };
      return state;
    });
    builder.addCase(checkinBook.pending, (state, action) => {
      state = { ...state, loading: true };
      return state;
    });

    builder.addCase(loadBookByBarcode.pending, (state, action) => {
      state = { ...state, loading: true };
      return state;
    });

    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    });
    builder.addCase(queryBooks.fulfilled, (state, action) => {
      return {
        ...state,
        books: action.payload.items,
        pagingInformation: {
          totalCount: action.payload.totalCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
          pageCount: action.payload.pageCount,
        },
        loading: false,
      };
    });
    builder.addCase(checkoutBook.fulfilled, (state, action) => {
      let bookList: Book[] = JSON.parse(JSON.stringify(state.books));
      bookList = bookList.map((book) => {
        if (book._id === action.payload.items) {
          book.records = [action.payload, ...book.records];
          return book;
        }
        return book;
      });
      state = {
        ...state,
        loading: false,
        books: bookList,
      };
      return state;
    });
    builder.addCase(checkinBook.fulfilled, (state, action) => {
      let bookList: Book[] = JSON.parse(JSON.stringify(state.books));
      bookList = bookList.map((book) => {
        if (book._id === action.payload.item) {
          book.records.splice(0, 1, action.payload);
          return book;
        }
        return book;
      });
      state = {
        ...state,
        loading: false,
        books: bookList,
      };
      return state;
    });
    builder.addCase(loadBookByBarcode.fulfilled, (state, action) => {
      state = {
        ...state,
        loading: false,
        currentBook: action.payload,
      };
      return state;
    });
    builder.addCase(loadBookByBarcode.rejected, (state) => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    });
  },
});

export const { setCurrentBook, resetError, updateCurrentBook } =
  BookSlice.actions;
export default BookSlice.reducer;
