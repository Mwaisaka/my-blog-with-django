import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Welcome to My Blog</h2>
          <p className="mt-2 text-lg text-gray-600">
            A place where I share insights and stories about nature, travel, science, and much more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Nature"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Exploring Nature</h3>
              <p className="mt-2 text-gray-600">
                Discover the wonders of nature, from serene landscapes to exotic wildlife. Dive deep into the beauty of our planet.
              </p>
              <a href="#" className="mt-4 inline-block text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Travel"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Travel Adventures</h3>
              <p className="mt-2 text-gray-600">
                Embark on journeys to incredible destinations. Get travel tips, guides, and inspiration for your next trip.
              </p>
              <a href="#" className="mt-4 inline-block text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Science"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Science and Innovation</h3>
              <p className="mt-2 text-gray-600">
                Stay updated with the latest in science and technology. Explore breakthroughs, discoveries, and innovations.
              </p>
              <a href="#" className="mt-4 inline-block text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Want to stay updated? Subscribe to my blog for the latest posts and insights!
          </p>
          <a
            href="#"
            className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Subscribe
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
