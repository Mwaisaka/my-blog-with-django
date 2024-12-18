
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Blogs from "./components/Blogs/Blogs.jsx";
import About from "./components/Admin/Admin.jsx";
import Contact from "./components/Contacts/ContactMe.jsx";
import Weather from "./components/Weather/Weather.jsx";
import AddBlog from "./components/Blogs/AddBlog.jsx";
import React from "react";
import "./index.css";
import Home from "./components/Home/Home.jsx";

function Main() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
       <Route path="/blogs" element={<Blogs />} />
       <Route path="/admin" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/weather" element={<Weather />} />
       <Route path="/addblog" element={<AddBlog />} />
       <Route path="*" element={<div>Not Found</div>} />
    </Route>)
  );
  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
