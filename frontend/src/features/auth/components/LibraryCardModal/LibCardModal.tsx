import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/ReduxStore";
import { setDisplayLibraryCard } from "../../../../redux/slices/ModelSlice";
import { Modal } from "../../../../components";
import React from "react";
import { RegisterLibCard } from "../RegisterLibraryCard/RegisterLibCard";

export const LibCardModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };
  return <Modal content={<RegisterLibCard />} toggleModal={closeModal} />;
};
