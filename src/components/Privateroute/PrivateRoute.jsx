import React, { use, useRef } from "react";

import { Navigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../Authentication/AuthContext";

const PrivateRoute = ({ children }) => {
    const toastShownRef = useRef(false);

  const { user } = use(AuthContext);

  if (user) {
    return children;
  }

if (!user && !toastShownRef.current) {
    toastShownRef.current = true;
  toast.error('Please Login to Access This Feature')
}

  return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;
