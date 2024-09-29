import React from "react";
import "./UpcomingEvent.css";
import { AutoAwesome } from "@mui/icons-material";
export const UpcomingEvent: React.FC = () => {
  return (
    // <div className="upcoming-events">
    //   <div className="upcoming-events-header-group">
    //     <AutoAwesome sx={{ fontSize: "2.25rem", color: "#3626A7" }} />
    //     <h2>Upcoming Events</h2>
    //     <AutoAwesome sx={{ fontSize: "2.25rem", color: "#3626A7" }} />
    //   </div>
    //   <h3>This Summer</h3>
    //   <h4>Tuesday's:10:00AM - Noon</h4>
    //   <ul className="upcoming-events-event">
    //     <li>
    //       <p>Who:Children to 6th grade</p>
    //     </li>
    //     <li>
    //       <p>Activities:Logic Puzzles,Scratch Programming</p>
    //     </li>
    //   </ul>
    //   <h4>Tuesday's:10:00AM - Noon</h4>
    //   <ul className="upcoming-events-event">
    //     <li>
    //       <p>Who:Asults (19+)</p>
    //     </li>
    //     <li>
    //       <p>Activities:craft and Sip - come enjoy a nice beverage and craft</p>
    //     </li>
    //   </ul>
    //   <h4>Tuesday's:10:00AM - Noon</h4>
    //   <ul className="upcoming-events-event">
    //     <li>
    //       <p>Who:Teens (7th to 12th grade) </p>
    //     </li>
    //     <li>
    //       <p>Activities:Web Programming Course -Learn the MERN Stack</p>
    //     </li>
    //   </ul>
    // </div>

    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-center items-center mb-4">
        <AutoAwesome sx={{ fontSize: "2.25rem", color: "#3626A7" }} />
        <h2 className="text-2xl font-bold text-gray-800 mx-2">
          Upcoming Events
        </h2>
        <AutoAwesome sx={{ fontSize: "2.25rem", color: "#3626A7" }} />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">This Summer</h3>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-1">
          Tuesday's: 10:00AM - Noon
        </h4>
        <ul className="list-disc list-inside text-gray-600">
          <li>Who: Children to 6th grade</li>
          <li>Activities: Logic Puzzles, Scratch Programming</li>
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-1">
          Tuesday's: 10:00AM - Noon
        </h4>
        <ul className="list-disc list-inside text-gray-600">
          <li>Who: Adults (19+)</li>
          <li>
            Activities: Craft and Sip - come enjoy a nice beverage and craft
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-1">
          Tuesday's: 10:00AM - Noon
        </h4>
        <ul className="list-disc list-inside text-gray-600">
          <li>Who: Teens (7th to 12th grade)</li>
          <li>Activities: Web Programming Course - Learn the MERN Stack</li>
        </ul>
      </div>
    </div>
  );
};
