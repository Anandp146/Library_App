import React from "react";
import "./LibraryCard.css";
import { AppDispatch } from "../../../redux/ReduxStore";
import { useDispatch } from "react-redux";
import libraryCard from "../../../assets/librarycard.png";
import { setDisplayLibraryCard } from "../../../redux/slices/ModelSlice";
export const LibraryCard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleDisplayModal = () => {
    dispatch(setDisplayLibraryCard(true));
  };
  return (
    // <div className="get-library-card">
    //   <h2>Get A Library Card</h2>
    //   <img src={libraryCard} className="get-library-card-img" alt="" />
    //   <p>
    //     Learn how to get Your own library card{" "}
    //     <span className="get-library-card-link" onClick={handleDisplayModal}>
    //       here.
    //     </span>
    //   </p>
    // </div>
    <div className="bg-white p-10 rounded-lg shadow-md w-full  text-center">
      <h2 className="text-xl font-bold mb-4">Get A Library Card</h2>
      <img
        src={libraryCard}
        className="mx-auto mb-4 w-80 h-auto rounded shadow-md"
        alt="Library Card"
      />
      <p className="text-sm">
        Learn how to get Your own library card{" "}
        <span
          className="text-blue-500 cursor-pointer underline"
          onClick={handleDisplayModal}
        >
          here.
        </span>
      </p>
    </div>
  );
};
