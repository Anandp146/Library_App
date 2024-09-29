import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { getLibraryCard } from "../../../../redux/slices/AuthSlice";
import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "../../../../redux/slices/ModelSlice";

export const RegisterLibCard: React.FC = () => {
  const userState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const handleCard = () => {
    if (userState.loggedInUser) {
      dispatch(getLibraryCard(userState.loggedInUser?._id));
    }
  };

  const handleLogin = () => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll on unmount
    };
  }, []);

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {userState.loggedInUser ? (
          <>
            <h3 className="text-2xl font-bold mb-2">
              Welcome {userState.loggedInUser.firstName}{" "}
              {userState.loggedInUser.lastName}
            </h3>
            <h5 className="text-sm mb-4">
              To signup for a new library card, or if you forgot the ID number
              on your card, use the button below.
            </h5>
            {userState.libraryCard ? (
              <div className="bg-gray-100 rounded-lg mt-4 p-4">
                <div className="mt-4 p-4 bg-gray-400 font-serif text-white rounded-lg shadow-lg">
                  <h4 className="font-bold text-gray-700  text-lg">
                    Library Card
                  </h4>
                  <p>ID: {userState.libraryCard}</p>
                  <p>
                    Name: {userState.loggedInUser.firstName}{" "}
                    {userState.loggedInUser.lastName}
                  </p>
                </div>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleCard}
              >
                Get Library Card
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              You must be a member of the library to obtain a library card.
            </h3>
            <h4 className="text-sm mb-4">
              Use the button below to login to your account or register for
              free.
            </h4>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleLogin}
            >
              Login Here
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
