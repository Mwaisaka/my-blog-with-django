// import React from "react";

// export default function Footer() {
//   return (
//     <footer>
//       <div className="bg-gray-300 border-gray-200 w-full mt-8 py-4 ">
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <span className="font-mono text-sm text-gray-700 sm:text-center">
//             Copyright © 2024 <t />
//             <a href="#" className="hover:underline">
//               <strong>
//                 <i>Frank Mwaisaka</i>
//               </strong>
//             </a>
//             . All Rights Reserved.
//           </span>
//         </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-300 border-t border-gray-200 w-full py-3 px-4 mt-6">
        <div className="px-4 sm:px-6 lg:px-14">
          <div className="text-center px-8">
            <span className="font-base text-sm text-gray-700 sm:text-center">
              Copyright © 2024 
              <a href="#" className="hover:underline mx-4">
                <strong>
                  <i>Frank Mwaisaka</i>
                </strong>
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
