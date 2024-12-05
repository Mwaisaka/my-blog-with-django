import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="shadow-lg sticky z-50 top-0">
      <nav className="bg-blue border-gray-200 px-4 lg:px-6 py-2.5 w-full">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <ul className="flex flex-row space-x-8 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
