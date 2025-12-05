import React, { useState, useEffect } from "react";
import { use } from "react";
import { Link, NavLink } from "react-router";

import { FaUser } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../Authentication/AuthContext";

const Navbar = () => {
  const { user, loading, signOutUser, setUser } = use(AuthContext);
  const [navOpen, setNavOpen] = useState(true);
  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => console.log(error.message));
  };

  const links = (
    <div className="lg:flex gap-3  text-center  font-bold">
      <li>
        <NavLink
          to="/"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Home Page">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="All available books in the website">
          All Games
        </NavLink>
      </li>
      {user ? (
        ""
      ) : (
        <>
          {loading ? (
            ""
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Connect with us!">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Connect with us!">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="">
      <div className="navbar min-h-20 sm:min-h-0 bg-base-100 max-w-[1600px] mx-auto shadow-sm">
        <div className="navbar-start px-2 sm:px-6 ">
          <div
            className="dropdown"
            onClick={() => {
              setNavOpen(!navOpen);
            }}>
              {navOpen ? <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost px-2 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
            </div> : <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost px-2 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
            </div>
}
            
            <ul
              tabIndex="-1"
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-60 h-45 p-2 shadow">
              {links}
            </ul>
          </div>
          <a
            className="btn btn-ghost text-lg sm:text-xl font-bold hover:bg-transparent hover:border-0 flex items-center"
            href="/">
            <FaBookOpen></FaBookOpen>
            Books<span className="text-secondary">Haven</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex gap-2 justify-center items-center">
              <img
                className="rounded-full object-cover w-10 h-10"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.displayName}
                src={`${user?.photoURL}`}
                alt="user_img"
                title={`User: ${user?.displayName}`}
              />
              <a
                onClick={handleSignOut}
                className="btn btn-secondary hover:bg-secondary text-[11px] md:text-[14px] hover:text-white bg-transparent text-secondary">
                <p className="hidden sm:block">Logout</p> <MdLogout />
              </a>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                className="btn px-2 h-8 sm:h-10 sm:px-4 text-[10px] text-white md:text-[14px] btn-secondary"
                to="/login">
                Login <FaUser />
              </Link>
              <Link
                to="/register"
                className="btn text-[10px] px-2 h-8 sm:h-10 py-2 sm:px-4 md:text-[14px] border-secondary text-secondary">
                Register <MdOutlineAssignment />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
