import React, { useState } from "react";
import blogs from "./blogs.json";

function Blogs() {
  const [posts, setPosts] = useState(blogs.posts);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleReadMore = (index) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleComments = (index) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLike = (index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].likes += 1; // Increment likes of the correct post
      return updatedPosts;
    });
  };

  const handleAddComment = (index, comment) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].comments.push(comment); // Add comment to the correct post
      return updatedPosts;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Filter posts by searchQuery before pagination
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages based on filtered posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get current page posts based on filtered posts
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handlers for pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">Welcome to my blog</h2>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
            className="border border-gray-300 p-2 rounded w-full mt-4"
          />
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-4 bg-gray-100 p-6 rounded-lg shadow-lg">
            {currentPosts.map((post, index) => {
              // Map the index of the full posts array (not currentPosts)
              const globalIndex = filteredPosts.indexOf(post);
              const isExpanded = expandedPosts[globalIndex];
              const shouldTruncate = post.content.length > 250;
              const areCommentsVisible = commentsVisible[globalIndex];

              return (
                <div
                  key={globalIndex}
                  className="rounded overflow-hidden shadow-lg p-4 bg-white mb-8"
                >
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <h3 className="text-m font-normal">{post.category}</h3>
                  <p className="text-gray-700 mt-2">
                    {shouldTruncate && !isExpanded
                      ? `${post.content.slice(0, 250)}...`
                      : post.content}
                  </p>
                  {shouldTruncate && (
                    <button
                      className="text-blue-600 mt-2 underline"
                      onClick={() => toggleReadMore(globalIndex)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <p className="text-gray-700 mt-2">Posted on: {post.date}</p>
                  <p className="text-gray-700 mt-2">{post.reading_time} read</p>

                  {/* Like button */}
                  <div className="mt-4 flex items-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => handleLike(globalIndex)}
                    >
                      Like
                    </button>
                    <span className="text-gray-700">{post.likes} likes</span>
                  </div>

                  {/* Toggle Comments Button */}
                  <div className="mt-4">
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded-md"
                      onClick={() => toggleComments(globalIndex)}
                    >
                      {areCommentsVisible
                        ? `Hide Comments (${post.comments.length})`
                        : `View Comments (${post.comments.length})`}
                    </button>
                  </div>

                  {/* Comment section */}
                  {areCommentsVisible && (
                    <div className="mt-4">
                      <ul className="mb-2">
                        {post.comments.length > 0 ? (
                          post.comments.map((comment, idx) => (
                            <li
                              key={idx}
                              className="text-gray-600 bg-gray-100 p-2 rounded mb-2"
                            >
                              {comment}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500 italic">
                            No comments yet.
                          </li>
                        )}
                      </ul>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const commentInput = e.target.elements.comment;
                          const comment = commentInput.value.trim();
                          if (comment) {
                            handleAddComment(globalIndex, comment);
                            commentInput.value = "";
                          }
                        }}
                      >
                        <input
                          type="text"
                          name="comment"
                          placeholder="Write a comment..."
                          className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-3 py-1 rounded-md"
                        >
                          Add Comment
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p className="text-gray-700">
                Page {currentPage} of {totalPages}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
