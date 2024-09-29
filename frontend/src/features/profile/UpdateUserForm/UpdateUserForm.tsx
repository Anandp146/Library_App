import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { User } from "../../../models/User";
import { useNavigate } from "react-router-dom";
import { Create } from "@mui/icons-material";
import { resetUser, updateUser } from "../../../redux/slices/AuthSlice";
import "./UpdateUserForm.css";

export const UpdateUserForm: React.FC = () => {
  const userState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();
  const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(userState.profileUser);
  const navigate = useNavigate();

  const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUpdate(true);
    if (e.target.value && e.target.name && user) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitUpdateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user) dispatch(updateUser(user));
    setDisplayUpdate(false);
  };
  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    dispatch(resetUser("loggedInUser"));
    dispatch(resetUser("profileUser"));
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      setUser(userState.profileUser);
    }
  }, [userState.profileUser, user]);

  return (
    <form
      className="
     bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className=" relative">
        <h4 className="text-lg font-semibold mb-2">First Name:</h4>
        <input
          className=" w-full p-2 border border-gray-300 rounded-lg"
          name="firstName"
          value={user?.firstName}
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create
            sx={{
              position: "absolute",
              top: "75%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        )}
      </div>

      <div className=" relative">
        <h4 className="text-lg font-semibold mb-2">Last Name:</h4>
        <input
          className=" w-full p-2 border border-gray-300 rounded-lg"
          name="lastName"
          value={user?.lastName}
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create
            sx={{
              position: "absolute",
              top: "75%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        )}
      </div>

      <div className=" relative">
        <h4 className="text-lg font-semibold mb-2">Email :</h4>
        <input
          className=" w-full p-2 border border-gray-300 rounded-lg"
          name="email"
          value={user?.email}
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create
            sx={{
              position: "absolute",
              top: "75%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        )}
      </div>

      {displayUpdate && (
        <button
          className=" w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          onClick={submitUpdateUser}
        >
          Update Profile
        </button>
      )}
      {userState.loggedInUser?._id === userState.profileUser?._id && (
        <button
          className=" w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
          onClick={logout}
        >
          Logout of Account
        </button>
      )}
    </form>
  );
};
