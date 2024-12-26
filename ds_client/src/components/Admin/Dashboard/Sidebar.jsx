import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  BiHome,
  BiBookAlt,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
  BiSolidCreditCardFront,
  BiSolidLandmark,
  BiSolidArch,
  BiGroup,
  BiCut,
} from "react-icons/bi";

import "./sidebar.css";
const Sidebar = ({ onLogout, onMenuItemClick }) => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  useEffect(() => {
    // Trigger handleMenuItemClick with "Dashboard" as default selected item
    onMenuItemClick("Dashboard");
  }, []);

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  const handleClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    onMenuItemClick(menuItem);
  };

  return (
    <div className="menu mt-9">
      {/* <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h2>Dashboard Overview</h2>
      </div> */}
      <div className="menu--list">
        {/* <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a> */}
        <div
          className={`item ${activeMenuItem === "Dashboard" ? "active" : ""}`}
          onClick={() => handleClick("Dashboard")}
        >
          <BiHome className="icon" />
          <span>Dashboard Home</span>
        </div>

        <div className="item">
          <BiGroup className="icon" />
          <Link to="/SubscribersList">List of Active Subscribers</Link>
        </div>

        <div
          className={`item ${activeMenuItem === "Add Blog" ? "active" : ""}`}
          onClick={() => handleClick("Add Blog")}
        >
          <BiHome className="icon" />
          <span>Add a blog</span>
        </div>
        <NavLink to="/addblog" className="item">
          <BiTask className="icon" />
          Edit a blog
        </NavLink>
        <NavLink to="/addblog" className="item">
          <BiCut className="icon" />
          Delete a blog
        </NavLink>

        <a href="#" className="item">
          <BiHelpCircle className="icon" />
          Help
        </a>
        <>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </>
      </div>
    </div>
  );
};

export default Sidebar;
