import React from "react";

export const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Contact Us
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Address</h4>
          <p className="text-gray-600">Laugh Logic Labs Library Street</p>
          <p className="text-gray-600">Library, 123456</p>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Phone Number</h4>
          <p className="text-gray-600">555-555-5555</p>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Email</h4>
          <p className="text-gray-600">abclibrary@lib.com</p>
        </div>
      </div>
    </div>
  );
};
