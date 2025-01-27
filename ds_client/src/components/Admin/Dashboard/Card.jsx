// import React from 'react'
// import { BiUser, BiChild, BiSolidUniversalAccess } from 'react-icons/bi'

// const levels = [
//     {
//         title:'Kindergarden',
//         icon:<BiSolidUniversalAccess></BiSolidUniversalAccess>,
//     },
//     {
//         title:'Primary',
//         icon:< BiChild/>,
//     },
//     {
//         title:'Secondary',
//         icon:<BiUser/>,
//     },
// ];

// const Card = () => {
//   return (
//     <div className='card--container'>
//         {levels.map((item) =>(
//             <div className='card'>
//             <div className='card--cover'>{item.icon}</div>
//             <div className='card--title'>
//                 <h2>{item.title}</h2>
//                 </div>
//             </div>
//         ))}
//     </div>
//   );
// };

// export default Card

import React from "react";
import { useParams } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import AddPosts from "../../Blogs/AddBlog";
import SubscribersList from "./SubscribersList";
import ManageBlogs from "../../Blogs/ManageBlogs";

const Card = ({ title }) => {
  const { path } = useParams(); // Get the current path

  switch (title) {
    case "Dashboard":
      return <DashboardHome />;
    case "Add Blog":
      return <AddPosts />;
    case "Manage a Blog":
      return <ManageBlogs />;
    case "SubscribersList":
      return <SubscribersList />;
    default:
      return null; // Return null if no matching menu item found
  }
};

export default Card;
