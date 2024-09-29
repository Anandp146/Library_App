import React from "react";
import "./Modal.css";

interface ModalProps {
  toggleModal(): void;
  content: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, content }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative  w-full max-w-md">{content}</div>
    </div>
  );
};
