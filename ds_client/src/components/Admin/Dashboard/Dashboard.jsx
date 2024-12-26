import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";

import "./dashboard.css";

const Dashboard = ({ onLogin, onLogout, user }) => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("Dashboard"); // State to track selected sidebar item

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  if (user) {
    return (
      <div className="dashboard">
        <Sidebar onLogout={onLogout} onMenuItemClick={handleMenuItemClick}/>
        <div className="dashboard--content">
          {selectedMenuItem && <Content title={selectedMenuItem} />}
          <Profile onLogin={onLogin} user={user} />
        </div>
      </div>
    );
  } else {
    return <h1>User not logged in. Please log in to view the Dashboard...</h1>;
  }
};

export default Dashboard;
