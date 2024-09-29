// import "./LibraryHours.css";
// export const LibraryHours: React.FC = () => {
//   return (
//     <div>
//       <h3 className="library-hours">Library Hours</h3>
//       <table className="library-hours-table" id="hours">
//         <tbody>
//           <tr>
//             <td>Monday</td>
//             <td>10 AM -6 PM</td>
//           </tr>
//           <tr>
//             <td>Tuesday</td>
//             <td>11 AM - 8 PM</td>
//           </tr>
//           <tr>
//             <td>Wednesday</td>
//             <td>10 AM - 6 PM</td>
//           </tr>
//           <tr>
//             <td>Thursday</td>
//             <td>11 AM - 8 PM</td>
//           </tr>
//           <tr>
//             <td>Friday</td>
//             <td>10 AM - 6 PM</td>
//           </tr>
//           <tr>
//             <td>Saturday</td>
//             <td>11 AM - 8 PM</td>
//           </tr>
//           <tr>
//             <td>Sunday</td>
//             <td>Closed</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React from "react";

export const LibraryHours: React.FC = () => {
  return (
    <div className="p-4  bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Library Hours
      </h3>
      <table className="min-w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <tbody>
          {[
            { day: "Monday", hours: "10 AM - 6 PM" },
            { day: "Tuesday", hours: "11 AM - 8 PM" },
            { day: "Wednesday", hours: "10 AM - 6 PM" },
            { day: "Thursday", hours: "11 AM - 8 PM" },
            { day: "Friday", hours: "10 AM - 6 PM" },
            { day: "Saturday", hours: "11 AM - 8 PM" },
            { day: "Sunday", hours: "Closed" },
          ].map((entry, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2 text-left text-gray-700">{entry.day}</td>
              <td className="px-4 py-2 text-right text-gray-700">
                {entry.hours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
