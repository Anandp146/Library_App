import React from "react";
import { LoanRecord } from "../../../models/LoanRecords";
import { useNavigate } from "react-router-dom";

interface BookHistoryProps {
  record: LoanRecord;
}

export const BookHistory: React.FC<BookHistoryProps> = ({ record }) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${record.patron}`);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2">
      <h4 className="text-xl font-bold mb-2">
        Status:{" "}
        <span
          className={
            record.status === "AVAILABLE" ? "text-green-600" : "text-red-600"
          }
        >
          {record.status}
        </span>
      </h4>
      <div className="mb-4">
        <p
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={visitProfile}
        >
          Patron: {record.patron}
        </p>
        <p className="text-gray-700">
          Loan Date: {new Date(record.loanedDate).toDateString()}
        </p>
        {record.status === "AVAILABLE" && record.returnedDate && (
          <p className="text-gray-700">
            Return Date: {new Date(record.returnedDate).toDateString()}
          </p>
        )}
      </div>
      <div>
        <p className="text-gray-700">Loaner: {record.employeeOut}</p>
        <p className="text-gray-700">
          Return By Date: {new Date(record.dueDate).toDateString()}
        </p>
        {record.status === "AVAILABLE" && record.employeeIn && (
          <p className="text-gray-700">Returner: {record.employeeIn}</p>
        )}
      </div>
    </div>
  );
};
