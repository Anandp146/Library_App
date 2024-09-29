// import { LoginRegisterModal } from "../../features/auth";
// import { Login } from "../../features/auth/components/loginform/Login";
import "./Home.css";
// import { RootState } from "../../redux/ReduxStore";
// import { useSelector } from "react-redux";
import {
  BookOfWeek,
  Contact,
  LibraryCard,
  LibraryHours,
  UpcomingEvent,
} from "../../features/landing";
export default function Home(): JSX.Element {
  // const displayLogin = useSelector(
  //   (state: RootState) => state.modal.displayLogin
  // );
  return (
    // <div
    //   className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    //   style={{ height: "100vh" }}
    // >
    //   <div className="text-center p-4">
    //     <h1 className="text-3xl md:text-4xl font-bold mb-6">Home Page</h1>
    //     <p className="text-lg md:text-xl">
    //       Welcome to the home page. Please register or login to continue.
    //     </p>
    //   </div>
    //   {displayLogin && (
    //     <div className="">
    //       <LoginRegisterModal />
    //     </div>
    //   )}
    // </div>

    // <div className="">
    //   <div className="">
    //     <div className="">
    //       <BookOfWeek />
    //       <UpcomingEvent />
    //     </div>
    //     <div className=""></div>
    //   </div>
    // </div>

    <div className="min-h-screen  p-6 flex justify-center items-center">
      <div className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BookOfWeek />
          <UpcomingEvent />
          <LibraryCard />
        </div>
        <div className="lg:col-span-1">
          <LibraryHours />
          <Contact />
        </div>
      </div>
    </div>
    // </div>
  );
}
