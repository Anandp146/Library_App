import React, { useEffect, useState } from "react";
import { LoanRecord } from "../../../models/LoanRecords";
import { RootState } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import axios from "axios";
import { ProfileLoan } from "./ProfileLoan";

export const ProfileLoanHistory: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.authentication.profileUser
  );
  const [records, setRecords] = useState<LoanRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecord = async () => {
    if (user) {
      try {
        let res = await axios.post("http://localhost:8000/loan/query", {
          property: `patron`,
          value: user._id,
        });
        let r = res.data.record;
        setRecords(r || []);
      } catch (e) {
        console.error(e);
        setRecords([]); // Set records to an empty array on error
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [user]);

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {user ? `${user.firstName}'s Item Loan History:` : "Loading User..."}
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {records.length > 0 ? (
            records.map((record) => (
              <ProfileLoan key={record._id} record={record} />
            ))
          ) : (
            <p>No records found.</p>
          )}
        </div>
      )}
    </div>
  );
};
// import React, { useEffect, useState } from "react";
// import { LoanRecord } from "../../../models/LoanRecords";
// import { RootState } from "../../../redux/ReduxStore";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { ProfileLoan } from "./ProfileLoan";

// export const ProfileLoanHistory: React.FC = () => {
//   const user = useSelector(
//     (state: RootState) => state.authentication.profileUser
//   );
//   const [records, setRecords] = useState<LoanRecord[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchRecord = async () => {
//     if (user) {
//       try {
//         console.log("Fetching records for user:", user._id); // Debug log
//         const res = await axios.post("http://localhost:8000/loan/query", {
//           property: "patron",
//           value: user._id,
//         });
//         console.log("Response from server:", res.data); // Debug log
//         const r = res.data.records;
//         setRecords(r || []);
//       } catch (e) {
//         console.error("Error fetching records:", e);
//         setRecords([]); // Set records to an empty array on error
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecord();
//   }, [user]);

//   return (
// <div className="bg-gray-100 rounded-lg p-6">
//   <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//     {user ? `${user.firstName}'s Item Loan History:` : "Loading User..."}
//   </h3>
//   {loading ? (
//     <p>Loading...</p>
//   ) : (
//     <div className="grid gap-4">
//       {records.length > 0 ? (
//         records.map((record) => (
//           <ProfileLoan key={record._id} record={record} />
//         ))
//       ) : (
//         <p>No records found.</p>
//       )}
//     </div>
//   )}
// </div>
//   );
// };
