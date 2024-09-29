import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/AuthSlice";
import modalreducer from "./slices/ModelSlice";
import bookReducer from "./slices/BookSlice";
export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    modal: modalreducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export default store;
