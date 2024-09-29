import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/ReduxStore";
import Home from "./pages/HomePage/Home";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./pages/LayoutPage/Layout";
import { fetchUser } from "./redux/slices/AuthSlice";
import Profile from "./pages/Profile/Profile";
import Catalog from "./pages/CatalogPage/Catalog";
import Resource from "./pages/ResorcePage/Resource";
import AddBook from "./pages/AddBook/AddBook";

function App() {
  const loggedInUser = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (userId && !loggedInUser) {
      dispatch(
        fetchUser({
          userId,
          property: "loggedInUser",
        })
      );
    }
  }, [loggedInUser, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />

          <Route path="/add-book" element={<AddBook />} />
          <Route path="resource/:barcode" element={<Resource />} />
          <Route path="profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
