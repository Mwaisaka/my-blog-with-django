import React from "react";

function Blogs() {
  const posts = [
    {
      tile: "Javascript",
      content:
        "JavaScript is the world's most popular lightweight, interpreted programming language. It is also known as a scripting language for web pages. JavaScript is widely used for the development of web pages, and many non-browser environments also use it. JavaScript can be used for client-side as well as server-side development.",
        date : "2015-01-01",
        reading_time : " 5 mins",
    },
    {
      tile: "Algorithm",
      content:
        "Algorithms are step-by-step instructions for solving problems or completing tasks. They are a fundamental concept in computer science and are used to develop efficient and effective solutions.",
        date : "2014-01-01",
        reading_time : " 3 mins",
    },
    {
      tile: "Python",
      content:
        "Python is a high-level programming language known for its simplicity and readability. It is widely used for web development, data analysis, artificial intelligence, and more.",
        date : "2013-01-01",
        reading_time : " 4 mins",
    },
    {
      tile: "HTML",
      content:
        "HTML (HyperText Markup Language) is the standard language for creating web pages. It provides the structure of a webpage and is used alongside CSS and JavaScript.",
        date : "2012-01-01",
        reading_time : " 1 mins",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">Welcome to my blog</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="rounded overflow-hidden shadow-lg p-4 bg-white"
              >
                <h3 className="text-xl font-semibold">{post.tile}</h3>
                <p className="text-gray-700 mt-2">{post.content}</p>
                <p className="text-gray-700 mt-2">Posted on : {post.date}</p>
                <p className="text-gray-700 mt-2">{post.reading_time} read</p>
                <p className="text-blue-600 mt-4 underline cursor-pointer">
                  Read more...
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Recent posts...</h3>
            <ul className="rounded overflow-hidden shadow-lg bg-white p-4">
              {["JavaScript", "Data Structure", "Algorithm", "Computer Network"].map(
                (post, index) => (
                  <li
                    key={index}
                    className="text-blue-700 underline underline-offset-1 mb-2"
                  >
                    <a href="#">{post}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
