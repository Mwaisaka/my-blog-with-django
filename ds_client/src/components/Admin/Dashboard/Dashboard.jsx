import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./dashboard.css";

const Dashboard = ({ onLogin, onLogout, user }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Keep sidebar open by default on larger screens
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  // Detect window resize to update `isMobile`
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setMobileMenuOpen((prev) => !prev); // Sync sidebar with mobile menu toggle
  };

  // Close sidebar when clicking a menu item (only on mobile)
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (isMobile) {
      setIsSidebarOpen(false);
      setMobileMenuOpen(false);
    }
  };

  if (!user) {
    return (
      <h1 className="text-center mt-10 text-xl">
        User not logged in. Please log in to view the Dashboard...
      </h1>
    );
  }

  return (
    <div className="dashboard-container mt-5">
      {/* Mobile Menu Button */}
      {isMobile && (
      <div className="mobile-menu-button">
        <button
          onClick={toggleSidebar}
          type="button"
          className="mobile-toggle-btn"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          ☰ {/* Mobile menu icon */}
        </button>
      </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="dashboard">
        {/* Sidebar (Visible unless toggled off on mobile) */}
        <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <Sidebar onLogout={onLogout} onMenuItemClick={handleMenuItemClick} />
        </div>

        {/* Main Content */}
        <div className={`dashboard--content ${isSidebarOpen ? "content-expanded" : "content-full"} mt-2`}>
          <Content title={selectedMenuItem} onLogin={onLogin} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
