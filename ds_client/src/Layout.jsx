import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-2xl items-center justify-center">
      <NavBar />
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-8 sm:px-16 lg:px-4 py-2 lg:py-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
