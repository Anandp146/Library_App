import React, { useRef, useState } from "react";
import "./Navbar.css"; // Ensure this CSS file includes the necessary styles
import { Book, Search, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { Link, useNavigate } from "react-router-dom";
import { setDisplayLogin } from "../../../redux/slices/ModelSlice";

export const Navbar: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const authState = useSelector((state: RootState) => state.authentication);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      searchRef &&
      searchRef.current &&
      searchRef.current.value.length > 0
    ) {
      navigate(
        `/catalog?barcode-${searchRef.current.value}&title-${searchRef.current.value}&description-${searchRef.current.value}`
      );
      searchRef.current.value = "";
    }
  };

  const handleSearchIconClicked = () => {
    if (searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(
        `/catalog?barcode-${searchRef.current.value}&title-${searchRef.current.value}&description-${searchRef.current.value}`
      );
      searchRef.current.value = "";
    }
  };

  const navigateToProfile = () => {
    if (authState.loggedInUser)
      navigate(`/profile/${authState.loggedInUser._id}`);
  };

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isAdmin =
    authState.loggedInUser && authState.loggedInUser.type === "ADMIN"; // Check if user is admin

  return (
    <nav className="bg-linear-gradient py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Book sx={{ fontSize: "2.5rem" }} className="text-white" />
          <h1 className="text-2xl font-serif font-bold text-white transition duration-300 hover:opacity-90">
            My Library
          </h1>
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? (
              <Close sx={{ fontSize: "2rem" }} />
            ) : (
              <Menu sx={{ fontSize: "2rem" }} />
            )}
          </button>
        </div>

        <div
          className={`flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 absolute md:static bg-white md:bg-transparent rounded-md shadow-lg md:shadow-none transition duration-300 ${
            isMenuOpen ? "top-16 left-0 w-full p-4" : "top-[-300px]"
          } md:top-0 md:flex md:relative`}
        >
          <Link
            to="/catalog"
            className="text-lg font-serif text-gray-300 hover:text-white font-bo transition duration-200"
          >
            View Catalog
          </Link>

          {isAdmin && (
            <Link
              to="/add-book"
              className="text-lg font-serif text-gray-300 hover:text-white font-bo transition duration-200"
            >
              Add Book
            </Link>
          )}

          <div className="relative w-full md:w-64">
            <input
              className="h-10 w-full pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200"
              placeholder="Search catalog"
              onKeyDown={handleEnterKey}
              ref={searchRef}
            />
            <Search
              onClick={handleSearchIconClicked}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 cursor-pointer hover:text-teal-600 transition duration-200"
              sx={{ fontSize: "1.5rem" }}
            />
          </div>
          {authState.loggedInUser ? (
            <div
              className="text-lg font-serif text-gray-300 hover:text-white cursor-pointer transition duration-200"
              onClick={navigateToProfile}
            >
              {authState.loggedInUser.firstName}'s Account
            </div>
          ) : (
            <div
              className="text-lg font-serif font-semibold text-gray-300 hover:text-white cursor-pointer transition duration-200"
              onClick={toggleLogin}
            >
              Login
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
