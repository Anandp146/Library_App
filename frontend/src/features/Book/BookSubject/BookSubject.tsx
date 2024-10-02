import React from "react";

interface BookSubjectProps {
  subjects: string[];
}
export const BookSubject: React.FC<BookSubjectProps> = ({ subjects }) => {
  const safeSubjects = Array.isArray(subjects) ? subjects : [];

  if (safeSubjects.length === 0) {
    return <p>No subjects available.</p>; // Optional message if subjects are empty
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-4">Book Subjects:</h3>
      <div className="flex flex-wrap">
        {safeSubjects.map((subject, index) => (
          <div
            // key={subject}
            key={index}
            className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2"
          >
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};
