import React from "react";

export default function DashboardHome() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "370px", margin: "0 100px", marginTop: "4rem" }}
    >
      <h2 className="text-2xl font-bold text-center underline">
        WELCOME TO THE DASHBOARD.
      </h2>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-opacity-50 p-10 text-black text-center mt-4">
        <p className="text-lg font-semibold">
          You will be able to manage the website using this platform. You will
          be able to...
          <ul className="list-disc pl-44 text-center mt-2">
            <li className="text-left">Add a blog</li>
            <li className="text-left">Edit a blog</li>
            <li className="text-left">Delete a blog</li>
          </ul>
        </p>

        <p className="text-lg font-semibold mt-2">
          Click on links on the sidebar to manage the website.
        </p>
      </div>
    </div>
  );
}
