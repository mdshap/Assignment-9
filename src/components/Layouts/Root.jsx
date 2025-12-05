import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import  { Toaster } from 'react-hot-toast';

const Root = () => {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Root;
