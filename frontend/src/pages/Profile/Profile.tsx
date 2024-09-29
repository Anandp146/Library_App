import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/ReduxStore";
import { fetchUser } from "../../redux/slices/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Profile.css";
import { ProfileLoanHistory, UpdateUserForm } from "../../features/profile";
export default function Profile() {
  const loggedInUser = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  const profileUser = useSelector(
    (state: RootState) => state.authentication.profileUser
  );

  const dispatch: AppDispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      if (loggedInUser?._id === userId || loggedInUser?.type === "EMPLOYEE") {
        dispatch(
          fetchUser({
            userId,
            property: "profileUser",
          })
        );
      } else {
        navigate("/");
      }
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {profileUser?.firstName} {profileUser?.lastName}'s Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50  rounded-lg shadow-md">
            <UpdateUserForm />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            {profileUser && <ProfileLoanHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}
