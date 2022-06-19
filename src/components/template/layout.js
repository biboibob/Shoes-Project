import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function layout({ children }) {
  return (
    <div className="flex flex-col grow">
      <Header />
      <main className="flex flex-col grow">{children}</main>
      <Footer />
    </div>
  );
}

export default layout;
