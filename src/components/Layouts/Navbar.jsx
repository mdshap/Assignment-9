import React from "react";
import { Link, NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";

const NavBar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full">
      <div className="">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {links}
              </ul>
            </div>
            <a className="btn btn-ghost text-2xl font-bold">
              Game <span className="text-primary ">Zone</span>
            </a>
          </div>

          <div className="navbar-end flex gap-2">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Submenu 1</a>
                </li>

                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <Link
              className="btn px-2 h-8 sm:h-10 sm:px-4 text-[10px] md:text-[14px] btn-secondary"
              to="/login">
              Login <FaUser />
            </Link>
            <Link
              to="/register"
              className="btn text-[10px] px-2 h-8 sm:h-10 py-2 sm:px-4 md:text-[14px] border-secondary text-secondary">
              Register <MdOutlineAssignment />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
