import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="shadow-lg sticky z-50 top-1 mb-4 py-2">
      <nav className="bg-white border-gray-200 px-6 lg:px-6 py-2.5 w-full">
        <div >
          <ul className="flex flex-row items-center space-x-8 font-bold">
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
                to="/blogs"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Blogs
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/weather"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Weather
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Contact Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addblog"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Add Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `hover:text-blue-500 ${
                    isActive ? "text-blue-700 font-bold" : "text-gray-700"
                  }`
                }
              >
                Site Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
