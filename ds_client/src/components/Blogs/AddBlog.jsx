import React, { useState } from "react";
import blogs from "./blogs.json";

function AddPosts() {
  // Local state for posts
  const [posts, setPosts] = useState(blogs.posts);
  
  // Form inputs state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState("");

  console.log("Posts", posts);
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check each field and alert accordingly
    if (!title) {
      alert("Please fill in the Title field.");
      return;
    }

    if (!category) {
      alert("Please select a Category.");
      return;
    }

    if (!content) {
      alert("Please fill in the Content field.");
      return;
    }

    if (!readingTime) {
      alert("Please fill in the Reading Time field.");
      return;
    }

    // Create a new post
    const newPost = {
      title,
      category,
      content,
      date: new Date().toISOString().split("T")[0], // Set current date
      reading_time: readingTime,
      likes: 0,
      comments: [],
    };

    // Add new post to the posts array
    setPosts((prevPosts) => {
      return [...prevPosts, newPost];
    });

    alert("New post added successfully");
    console.log("New post", newPost);

    // Optionally, you can clear the form
    setTitle("");
    setCategory("");
    setContent("");
    setReadingTime("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-gray-200 shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Create a New Blog Post
          </h2>
          <p className="text-gray-600">
            Fill out the form below to share your blog with the world.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the title of your blog"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category} // Bind category value to state
              onChange={(e) => setCategory(e.target.value)} // Update category state on change
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          {/* Content Input */}
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="5"
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* Reading Time Input */}
          <div className="mb-4">
            <label
              htmlFor="readingTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reading Time
            </label>
            <input
              type="text"
              id="readingTime"
              placeholder="Estimated reading time (e.g., 5 mins)"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPosts;
