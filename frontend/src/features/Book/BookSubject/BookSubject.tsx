import React from "react";

interface BookSubjectProps {
  subjects: string[];
}
export const BookSubject: React.FC<BookSubjectProps> = ({ subjects }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-4">Book Subjects:</h3>
      <div className="flex flex-wrap">
        {subjects.map((subject, index) => (
          <div
            key={subject}
            className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2"
          >
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};
