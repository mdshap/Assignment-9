import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
