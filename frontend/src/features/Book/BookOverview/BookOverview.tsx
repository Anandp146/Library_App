import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import { BookInfo } from "../BookInfo/BookInfo";
import { BookSubject } from "../BookSubject/BookSubject";
import { BookAddInfo } from "../BookAddInfo/BookAddInfo";
import { History } from "../History/History";

export const BookOverview: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const user = useSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  return (
    // <div className="book-overview">
    //   {bookState.currentBook && !bookState.loading && (
    //     <>
    //       <BookInfo book={bookState.currentBook} />
    //     </>
    //   )}
    // </div>
    <div className=" py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4">
          {bookState.currentBook && !bookState.loading && (
            <>
              <div className=" p-4 rounded-lg shadow-md">
                <BookInfo book={bookState.currentBook} />
              </div>
              <div className=" p-4 rounded-lg shadow-md">
                <BookSubject subjects={bookState.currentBook.subjects} />
              </div>
              <div className=" p-4 rounded-lg shadow-md">
                <BookAddInfo book={bookState.currentBook} />
              </div>
              {user?.type === "EMPLOYEE" && (
                <div className=" p-4 bg-white rounded-lg shadow-md">
                  <History book={bookState.currentBook} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
