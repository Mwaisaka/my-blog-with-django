import React from "react";
import { useNavigate } from "react-router-dom";

function BlogsCard({ image, title, description }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        {/* <a href="/blogs" className="mt-4 inline-block text-blue-500 hover:underline">
          Read More
        </a> */}

        <button onClick={() => navigate("/blogs")} className="mt-4 inline-block text-blue-500 hover:underline">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default BlogsCard;
