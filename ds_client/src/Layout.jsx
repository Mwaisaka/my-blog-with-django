import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Quotes from "./components/Quotes/Quotes";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-3xl items-center justify-center">
      <ScrollToTop />
      <NavBar />
      <Quotes />
      <main className="flex-grow w-full max-w-screen-3xl mx-auto px-8 sm:px-16 lg:px-8 py-2 lg:py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
