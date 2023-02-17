import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

// Page Component
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./sideBar";
import Loading from "../Loading/Loading";

function Layout({ children }) {
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <Loading>
      <div
        className={`w-100 min-h-screen flex flex-col transition-all ease-out-expo relative`}
      >
        <Header />
        <main className="flex flex-col grow bg-soft-gray-2">{children}</main>
        <Footer />
      </div>

      <SideBar />
    </Loading>
  );
}

export default Layout;
