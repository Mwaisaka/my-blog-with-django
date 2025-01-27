import React from "react";
import Subscribe from "../Subscribe/Subscribe";
import Travel from "../../assets/Travel.png";
import Finance from "../../assets/Finance.png";
import Technology from "../../assets/Technology.png";
import BlogsCard from "./BlogsCard";

function Home() {
  //Blog Categories
  const blogCategories = [
    {
      image: Finance,
      title: "Personal Finance",
      description:
        "Discover the essentials of personal finance, from budgeting and" +
        " saving to investing and retirement planning. Learn practical " +
        "tips to take control of your money, achieve financial goals, and " +
        "build a secure future.",
    },
    {
      image: Travel,
      title: "Travel Adventures",
      description:
        "Embark on journeys to incredible destinations. Get travel tips, " +
        "guides, and inspiration for your next trip.",
    },
    {
      image: Technology,
      title: "Technology",
      description:
        "Stay updated with the latest in science and technology. Explore " +
        "breakthroughs, discoveries, and innovations.",
    },
  ];
  return (
    <div className="animate-swipeUp min-h-screen flex justify-center items-center -mb-10 mt-3">
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome to My Blog
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            A place where I share insights and stories about nature, travel,
            technology, and much more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogCategories.map((category, index) => (
            <BlogsCard key={index} {...category} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Subscribe />
        </div>
      </div>
    </div>
  );
}

export default Home;
