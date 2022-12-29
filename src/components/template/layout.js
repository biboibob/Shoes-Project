import React from "react";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

// Page Component
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./sideBar";

function Layout({ children }) {
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);

  return (
    <div className="flex flex-col relative bg-soft-gray-2 min-h-screen">
      <div
        className={`w-100 min-h-screen flex flex-col transition-all ease-out-expo relative`}
      >
        <Header />
        <main className="flex flex-col grow bg-soft-gray-2">{children}</main>
        <Footer />
      </div>

      <SideBar
        className={`${
          sideBar ? "left-0" : "-left-full "
        } fixed w-full h-full bg-white inset-y-0 z-[9999] duration-500 transition-all flex flex-col overscroll-y-contain p-4 gap-3`}
      />
    </div>
  );
}

export default Layout;
