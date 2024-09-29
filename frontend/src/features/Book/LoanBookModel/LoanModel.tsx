import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { setDisplayLoan } from "../../../redux/slices/ModelSlice";
import { Modal } from "../../../components";
import { determineLoanModalContent } from "../utils/BookUtil";
import { useNavigate } from "react-router-dom";

export const LoanModel: React.FC = () => {
  const currentBook = useSelector((state: RootState) => state.book.currentBook);
  const dispatch: AppDispatch = useDispatch();
  const bookState = useSelector((state: RootState) => state.book);
  const navigate = useNavigate();

  if (bookState.error) navigate("/catalog");

  const closeModal = () => {
    dispatch(setDisplayLoan(false));
  };

  return (
    <Modal
      content={currentBook ? determineLoanModalContent(currentBook) : <></>}
      toggleModal={closeModal}
    />
  );
};
