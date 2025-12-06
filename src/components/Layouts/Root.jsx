import React, { use, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useMatches } from "react-router";
import Footer from "./Footer";
import  { Toaster } from 'react-hot-toast';
import { AuthContext } from "../Authentication/AuthContext";
import Loader from "../Loader";

const Root = () => {
  const matches = useMatches();


  useEffect(() => {
    const last = matches[matches.length - 1];
    if (last?.handle?.title) {
      document.title = last.handle.title;
    }
  }, [matches]);

  const {loading} = use(AuthContext)

  if(loading){
    return <Loader/>
  }
  
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
