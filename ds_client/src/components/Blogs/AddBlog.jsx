import React, { useState } from "react";

function AddPosts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !content || !readingTime) {
      alert("All fields are required.");
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

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const response = await fetch(`${API_URL}/posts/add_post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Post added successfully"); // Update the success message
        console.log("Added post:", data);

        //Clear the form
        setTitle("");
        setCategory("");
        setContent("");
        setReadingTime("");
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add post");
      }
    } catch (err) {
      console.error("Error adding post:", err.message);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

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

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-6 mt-3 mb-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddPosts;
