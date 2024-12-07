import React from "react";

function AddPosts() {
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
        <form>
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
            />
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
