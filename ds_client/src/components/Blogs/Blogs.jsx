// // import React, { useState } from "react";
// // import blogs from "./blogs.json";

// // function Blogs() {
// //   const [posts, setPosts] = useState(
// //     blogs.posts.sort((a, b) => new Date(b.date) - new Date(a.date))
// //   );
// //   const [expandedPosts, setExpandedPosts] = useState({});
// //   const [commentsVisible, setCommentsVisible] = useState({});
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const toggleReadMore = (id) => {
// //     setExpandedPosts((prev) => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };

// //   const toggleComments = (id) => {
// //     setCommentsVisible((prev) => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };

// //   const handleLike = (id) => {
// //     setPosts((prevPosts) =>
// //       prevPosts.map((post) =>
// //         post.id === id ? { ...post, likes: post.likes + 1 } : post
// //       )
// //     );
// //   };

// //   const handleAddComment = (id, comment) => {
// //     setPosts((prevPosts) =>
// //       prevPosts.map((post) =>
// //         post.id === id
// //           ? { ...post, comments: [...post.comments, comment] }
// //           : post
// //       )
// //     );
// //   };

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const postsPerPage = 3;

// //   const filteredPosts = posts.filter(
// //     (post) =>
// //       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       post.category.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

// //   const currentPosts = filteredPosts.slice(
// //     (currentPage - 1) * postsPerPage,
// //     currentPage * postsPerPage
// //   );

// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage((prev) => prev - 1);
// //     }
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage((prev) => prev + 1);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex justify-center items-center mt-8">
// //       <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
// //         <div className="mb-4 text-center">
// //           <h2 className="text-3xl font-bold">Welcome to my blog</h2>
// //           <input
// //             type="text"
// //             placeholder="Search blogs by title or category..."
// //             value={searchQuery}
// //             onChange={(e) => {
// //               setSearchQuery(e.target.value);
// //               setCurrentPage(1);
// //             }}
// //             className="border border-gray-300 p-2 rounded w-full mt-4"
// //           />
// //         </div>
// //         <div className="grid grid-cols-4">
// //           <div className="col-span-4 bg-gray-100 p-6 rounded-lg shadow-lg">
// //             {currentPosts.length > 0 ? (
// //               currentPosts.map((post) => {
// //                 const isExpanded = expandedPosts[post.id];
// //                 const shouldTruncate = post.content.length > 250;
// //                 const areCommentsVisible = commentsVisible[post.id];

// //                 return (
// //                   <div
// //                     key={post.id}
// //                     className="rounded overflow-hidden shadow-lg p-4 bg-white mb-8"
// //                   >
// //                     <h3 className="text-xl font-semibold">{post.title}</h3>
// //                     <h3 className="text-m font-normal">{post.category}</h3>
// //                     <p className="text-gray-700 mt-2">
// //                       {shouldTruncate && !isExpanded
// //                         ? `${post.content.slice(0, 250)}...`
// //                         : post.content}
// //                     </p>
// //                     {shouldTruncate && (
// //                       <button
// //                         className="text-blue-600 mt-2 underline"
// //                         onClick={() => toggleReadMore(post.id)}
// //                       >
// //                         {isExpanded ? "Read Less" : "Read More"}
// //                       </button>
// //                     )}
// //                     <p className="text-gray-700 mt-2">Posted on: {post.date}</p>
// //                     <p className="text-gray-700 mt-2">
// //                       {post.reading_time} read
// //                     </p>
// //                     <div className="mt-4 flex items-center">
// //                       <button
// //                         className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
// //                         onClick={() => handleLike(post.id)}
// //                       >
// //                         Like
// //                       </button>
// //                       <span className="text-gray-700">{post.likes} likes</span>
// //                     </div>
// //                     <div className="mt-4">
// //                       <button
// //                         className="bg-gray-500 text-white px-3 py-1 rounded-md"
// //                         onClick={() => toggleComments(post.id)}
// //                       >
// //                         {areCommentsVisible
// //                           ? `Hide Comments (${post.comments.length})`
// //                           : `View Comments (${post.comments.length})`}
// //                       </button>
// //                     </div>
// //                     {areCommentsVisible && (
// //                       <div className="mt-4">
// //                         <ul className="mb-2">
// //                           {post.comments.length > 0 ? (
// //                             post.comments.map((comment, idx) => (
// //                               <li
// //                                 key={idx}
// //                                 className="text-gray-600 bg-gray-100 p-2 rounded mb-2"
// //                               >
// //                                 {comment}
// //                               </li>
// //                             ))
// //                           ) : (
// //                             <li className="text-gray-500 italic">
// //                               No comments yet.
// //                             </li>
// //                           )}
// //                         </ul>
// //                         <form
// //                           onSubmit={(e) => {
// //                             e.preventDefault();
// //                             const commentInput = e.target.elements.comment;
// //                             const comment = commentInput.value.trim();
// //                             if (comment) {
// //                               handleAddComment(post.id, comment);
// //                               commentInput.value = "";
// //                             }
// //                           }}
// //                         >
// //                           <input
// //                             type="text"
// //                             name="comment"
// //                             placeholder="Write a comment..."
// //                             className="border border-gray-300 p-2 rounded w-full mb-2"
// //                           />
// //                           <button
// //                             type="submit"
// //                             className="bg-green-500 text-white px-3 py-1 rounded-md"
// //                           >
// //                             Add Comment
// //                           </button>
// //                         </form>
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               })
// //             ) : (
// //               <div className="text-center text-gray-500 italic mt-8">
// //                 No results found for "{searchQuery}".
// //               </div>
// //             )}
// //             <div className="flex justify-between items-center mt-6">
// //               <button
// //                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
// //                 onClick={handlePreviousPage}
// //                 disabled={currentPage === 1}
// //               >
// //                 Previous
// //               </button>
// //               <p className="text-gray-700">
// //                 Page {currentPage} of {totalPages}
// //               </p>
// //               <button
// //                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
// //                 onClick={handleNextPage}
// //                 disabled={currentPage === totalPages}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Blogs;

import React, { useState, useEffect } from "react";

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Date formatting function
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  };

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/posts/");
        const data = await response.json();

        console.log("Posts fetched", data);
        // Sort posts by date in descending order
        setPosts(data.sort((b, a) => new Date(a.create_date) - new Date(b.create_date)));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleComments = (id) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleAddComment = (id, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
    <div className="min-h-screen flex justify-center items-center mt-8">
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">Welcome to my blog</h2>
          <input
            type="text"
            placeholder="Search blogs by title or category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 p-2 rounded w-full mt-4"
          />
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-4 bg-gray-100 p-6 rounded-lg shadow-lg">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => {
                const isExpanded = expandedPosts[post.id];
                const shouldTruncate = post.content.length > 250;
                const areCommentsVisible = commentsVisible[post.id];

                return (
                  <div
                    key={post.id}
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
                        onClick={() => toggleReadMore(post.id)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                    <p className="text-gray-700 mt-2">
                      Posted on: {formatDate(post.create_date)}
                    </p>
                    <p className="text-gray-700 mt-2">
                      {post.reading_time} read
                    </p>
                    <div className="mt-4 flex items-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => handleLike(post.id)}
                      >
                        Like
                      </button>
                      <span className="text-gray-700">{post.likes} likes</span>
                    </div>
                    <div className="mt-4">
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded-md"
                        onClick={() => toggleComments(post.id)}
                      >
                        {areCommentsVisible
                          ? `Hide Comments (${post.comments.length})`
                          : `View Comments (${post.comments.length})`}
                      </button>
                    </div>
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
                              handleAddComment(post.id, comment);
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
              })
            ) : (
              <div className="text-center text-gray-500 italic mt-8">
                No results found for "{searchQuery}".
              </div>
            )}
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
