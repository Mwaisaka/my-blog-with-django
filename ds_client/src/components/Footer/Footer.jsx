import React from "react";
function Footer() {
  return (
    <footer>
      <div className="bg-gray-100 border-t border-gray-100 mx-auto w-full max-w-screen-xl py-3 px-4 mt-6 mb-1">
        <div className="px-4 sm:px-2 lg:px-14">
          <div className="text-center px-8">
            <span className="font-base text-sm text-gray-700 sm:text-center">
              Copyright © 2025 
              <a href="/" className="hover:underline mx-4">
                <strong>
                  <i>Frank Mwaisaka.</i>
                </strong>
              </a>
              All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
