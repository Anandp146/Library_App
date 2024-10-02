import React from "react";

export const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Contact Us
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Address</h4>
          <p className="text-sm text-gray-600">Charusat Library A6</p>
          <p className="text-sm text-gray-600">Library, 123456</p>
        </div>
        <div className="border-t border-gray-200 my-3"></div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Phone Number</h4>
          <p className="text-gray-600 text-sm">555-555-5555</p>
        </div>
        <div className="border-t border-gray-200 my-3"></div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Email</h4>
          <p className="text-gray-600 text-sm">abclibrary@lib.com</p>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-gray-800 mb-2 text-center">
          Frequently Asked Questions
        </h4>

        <div>
          <h5 className="text-lg font-semibold text-gray-700">
            What is the procedure for obtaining a library card?
          </h5>
          <p className="text-base text-gray-600">
            You can apply for a library card by visiting our registration page
            or at the front desk with a valid ID.
          </p>
        </div>
        <div>
          <h5 className="text-lg font-semibold text-gray-700">
            Are there any late fees for returning books?
          </h5>
          <p className="text-base text-gray-600">
            Yes, we charge a small fee of ₹50 per day for late returns to
            encourage timely book returns.
          </p>
        </div>
        <div>
          <h5 className="text-lg font-semibold text-gray-700">
            Can I reserve books online?
          </h5>
          <p className="text-gray-600 text-base">
            Absolutely! You can reserve books via your library account once
            you're logged in.
          </p>
        </div>
      </div>

      {/* Responsive Map Integration (Optional) */}
      <div className="relative overflow-hidden pb-[50%] mt-6 shadow-xl rounded-lg">
        <iframe
          title="Library Location"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14158.354187511639!2d72.8229914!3d22.5987585!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e50c43cdea6c7%3A0x5074fe9e0c1c8bd!2sCharotar%20University%20of%20Science%20and%20Technology%20(CHARUSAT)!5e1!3m2!1sen!2sin!4v1727683289093!5m2!1sen!2sin"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
      {/* </div> */}
    </div>
  );
};
