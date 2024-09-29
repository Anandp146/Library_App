// import React, { useEffect, useState } from "react";
// import { LoanRecord } from "../../../models/LoanRecords";

// interface ProfileLoanProps {
//   record: LoanRecord;
// }

// export const ProfileLoan: React.FC<ProfileLoanProps> = ({ record }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 md:w-80 lg:w-96">
//       <h4 className="text-xl font-semibold text-gray-800">
//         Title: {record.item.title}
//       </h4>
//       <h4 className={`text-lg font-medium `}>
//         Status: {record.status === "AVAILABLE" ? "RETURNED" : "LOANED"}
//       </h4>
//       <p className="text-gray-700">
//         Loan Date: {new Date(record.loanedDate).toDateString()}
//       </p>
//       <p className="text-gray-700">
//         Return by Date: {new Date(record.dueDate).toDateString()}
//       </p>
//       {record.returnedDate && (
//         <p className="text-gray-700">
//           Date Returned: {new Date(record.returnedDate).toDateString()}
//         </p>
//       )}
//     </div>
//   );
// };

import React from "react";
import { LoanRecord } from "../../../models/LoanRecords";

interface ProfileLoanProps {
  record: LoanRecord;
}

export const ProfileLoan: React.FC<ProfileLoanProps> = ({ record }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="text-xl font-semibold text-gray-800">
        Title: {record.item.title}
      </h4>
      <h4
        className={`text-lg font-medium ${
          record.status === "AVAILABLE" ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {record.status === "AVAILABLE" ? "RETURNED" : "LOANED"}
      </h4>
      <p className="text-gray-700">
        Loan Date: {new Date(record.loanedDate).toDateString()}
      </p>
      <p className="text-gray-700">
        Return by Date: {new Date(record.dueDate).toDateString()}
      </p>
      {record.returnedDate && (
        <p className="text-gray-700">
          Date Returned: {new Date(record.returnedDate).toDateString()}
        </p>
      )}
    </div>
  );
};
