import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SoftDev from "../../assets/SoftDev.jpg";

function NavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  // Function to close the mobile menu when a link is clicked
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="shadow-lg sticky z-50 top-0 mb-4 py-0">
      <nav className="bg-white border-gray-200 px-6 lg:px-6 py-2.5 w-full">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <img
              src={SoftDev}
              className="mr-6 h-15"
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
          <div className="flex items-center lg:order-4 lg:px-10 lg:space-x-10">
          {/* <Link
              to="#"
              className="text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              onClick={closeMobileMenu} // Close menu on button click
            >
              Toggle
            </Link> */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 ml-16 space-x-36 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zM3 10h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-blue-500 ${
                      isActive ? "text-blue-700 font-bold" : "text-gray-700"
                    }`
                  }
                  onClick={closeMobileMenu} // Close menu on link click
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
                  onClick={closeMobileMenu} // Close menu on link click
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
                onClick={closeMobileMenu} // Close menu on link click
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
                  onClick={closeMobileMenu} // Close menu on link click
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
                  onClick={closeMobileMenu} // Close menu on link click
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
                  onClick={closeMobileMenu} // Close menu on link click
                >
                  Site Admin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;

