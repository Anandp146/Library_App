import { Modal } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { useEffect, useState } from "react";
import { setDisplayLogin } from "../../../../redux/slices/ModelSlice";
import { Login } from "../loginform/Login";
import { Register } from "../registerform/Register";

export const LoginRegisterModal: React.FC = () => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();
  const [login, setLogin] = useState<boolean>(true);

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll on unmount
    };
  }, []);

  const closeModal = () => {
    dispatch(setDisplayLogin(false));
  };

  const toggleLogin = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  useEffect(() => {
    if (authState.loggedInUser) {
      closeModal();
    }
  }, [authState.loggedInUser, dispatch]);

  useEffect(() => {
    return () => {
      if (authState.loggedInUser) {
        localStorage.setItem("userId", authState.loggedInUser._id);
      }
    };
  }, [authState.loggedInUser]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 min-h-screen">
      <Modal
        content={
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl transition-transform transform scale-100 hover:scale-105 duration-300 p-4 relative">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
            </div>
            <div className="flex justify-center ">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                {login ? "Login" : "Register"}
              </h2>
            </div>
            {login ? (
              <Login toggleRegister={toggleLogin} />
            ) : (
              <Register toggleLogin={toggleLogin} />
            )}

            <div className="text-center mt-4">
              <button
                onClick={toggleLogin}
                className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold transition duration-200 ease-in-out"
              >
                {login
                  ? "Don't have an account? Register here"
                  : "Already have an account? Login here"}
              </button>
            </div>
          </div>
        }
        toggleModal={closeModal}
      />
    </div>
  );
};
