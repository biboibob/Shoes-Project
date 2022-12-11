import React from "react";
import { useSelector } from "react-redux";


// Page Component
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./sideBar";

function Layout({ children }) {
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);

  return (
    <div className="flex relative bg-soft-gray-2 min-h-screen">
      <div className={`${sideBar ? 'w-0 overflow-hidden' : 'w-100'} flex flex-col transition-all ease-out-expo relative`}>
        <Header />
        <main className="flex flex-col grow bg-soft-gray-2">{children}</main>
        <Footer />
      </div>
      <div className={`${sideBar ? 'w-100' : 'w-0 overflow-hidden'}  transition-all ease-out-expo flex flex-col grow`}>
        <SideBar />
      </div>
    </div>
  );
}

export default Layout;
