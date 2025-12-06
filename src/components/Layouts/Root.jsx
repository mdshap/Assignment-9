import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useMatches } from "react-router";
import Footer from "./Footer";
import  { Toaster } from 'react-hot-toast';

const Root = () => {
  const matches = useMatches();

  useEffect(() => {
    const last = matches[matches.length - 1];
    if (last?.handle?.title) {
      document.title = last.handle.title;
    }
  }, [matches]);

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
