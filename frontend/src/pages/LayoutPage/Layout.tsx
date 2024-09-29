import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { LibCardModal, LoginRegisterModal } from "../../features/auth";
import { RootState } from "../../redux/ReduxStore";
import { Footer, Navbar } from "../../features/navigation";
import { LoanModel } from "../../features/Book";

export default function Layout() {
  const state = useSelector((state: RootState) => state.modal);
  return (
    <div className="layout">
      {state.displayLogin && <LoginRegisterModal />}
      {state.displayLibraryCard && <LibCardModal />}
      {state.displayLoan && <LoanModel />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
