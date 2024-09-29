import React from "react";
import "./BookOfWeek.css";
import { BookInfo } from "../../Book";
export const BookOfWeek: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Book of the Week:
      </h1>
      <BookInfo
        book={{
          _id: "1234",
          barcode: "1234",
          cover:
            "https://in.bpbonline.com/cdn/shop/products/1021_Front_800x.jpg?v=1625292682",
          title:
            "Java: The Ultimate Beginner's Guide to Learn Java Quickly with no Prior Experience",
          authors: ["Mark Reed"],
          description:
            "Immerse yourself in the wealth of notions, exercises and practical examples made easily digestible for effortless learning and prompt gratification. You will be amazed at the rapid progress as you move forward through the book's contents toward total savvy.",
          subjects: ["java", "learning"],
          publicationDate: new Date("2020-01-01"),
          publisher: "some publisher",
          pages: 200,
          genre: "Non-fiction",
          records: [],
        }}
      />
    </div>
  );
};
