import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { loginUser } from "../../../../redux/slices/AuthSlice";

interface LoginFormProps {
  toggleRegister(): void;
}

export const Login: React.FC<LoginFormProps> = ({ toggleRegister }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form className="w-full max-w-md px-8 py-6 mx-auto mt-8 md:mt-0 md:py-8 md:px-10">
        {auth.error && (
          <p className="text-red-500 text-center mb-4">
            Username or password incorrect
          </p>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            required
            ref={emailRef}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            required
            ref={passwordRef}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            type="button"
            onClick={handleLoginUser}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
