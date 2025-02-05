import React from "react";

export default function DashboardHome() {
  return (
    <div className="animate-swipeUp min-h-screen flex justify-center px-4 sm:px-8 lg:px-16 mt-8">
      <div className="relative overflow-hidden w-full max-w-4xl sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-10 bg-gray-100 rounded-lg shadow-none">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center underline">
          WELCOME TO THE DASHBOARD
        </h2>

        {/* Content Section */}
        <div className="mt-6 sm:mt-8 text-black text-center">
          <p className="text-lg font-semibold">
            You will be able to manage the website using this platform. You will
            be able to...
          </p>

          {/* Features List */}
          <ul className="list-disc pl-6 sm:pl-12 text-left sm:text-center mt-4">
            <li>Add a blog</li>
            <li>Edit a blog</li>
            <li>View a blog</li>
            <li>Delete a blog</li>
            <li>View a message</li>
            <li>Delete a message</li>
            <li>Delete a subscriber</li>
          </ul>

          {/* Instructions */}
          <p className="text-lg font-semibold mt-6">
            Click on links on the sidebar to manage the website.
          </p>
        </div>
      </div>
    </div>
  );
}
