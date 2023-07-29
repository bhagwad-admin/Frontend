import React, { useState } from "react";
import { Link } from "react-router-dom";
import adhyayData from "./Content/Adhyay/index.json";
import { FRONT_URL } from "./Constant";
import ImageWithPlaceholder from "./ImageWithPlaceholder";
import tableOfContent from "./Assets/table-of-content.png";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full min-h-[89.2vh] flex flex-col items-center justify-center pt-20 pb-14 space-y-8">
      <h1 className="text-4xl md:text-7xl font-extrabold text-center cursor-default">
        SHRIMAD BHAGWAD GITA
      </h1>
      <div className="flex w-[80%] bg-[#FFFFFF99] rounded-md px-3 py-8 md:py-4   flex-col items-center ">
        <div className="flex justify-center items-center w-full">
          {/* <img
            src={
              "https://bhagwad-admin.github.io/Frontend" +
              "/Assets/table-of-content.png"
            }
            className="w-[60%] md:w-[20%]"
          /> */}
          <ImageWithPlaceholder
            // src={FRONT_URL + "Assets/table-of-content.png"}
            src={tableOfContent}
            alt="Table of Content"
            className="w-[60%] md:w-[20%]"
          />
        </div>
        <div className="flex flex-col items-center w-full space-y-8">
          <div className="flex items-center space-x-5" onClick={toggleOpen}>
            <h3 className="w-4/5 text-center text-lg font-semibold hover:font-bold cursor-pointer">
              Adhyay
            </h3>
            <span
              className={`transform transition-transform cursor-pointer ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>

          {isOpen && (
            <div className="w-full flex flex-wrap items-center justify-center ">
              {adhyayData.chapters.map((adhyay) => (
                <p key={adhyay.id} className="text-center w-[48%] md:w-[10%] ">
                  <Link
                    to={`/chapters/${adhyay.id}`}
                    className="w-4/5 text-center text-lg font-semibold hover:font-bold cursor-pointer"
                  >
                    {adhyay.name}
                  </Link>
                </p>
              ))}
            </div>
          )}

          <Link
            to="/meanings"
            className="w-4/5 text-center text-lg font-semibold hover:font-bold cursor-pointer"
          >
            Shabdakosh
          </Link>
          <Link
            to="/blogs"
            className="w-4/5 text-center text-lg font-semibold hover:font-bold cursor-pointer"
          >
            Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
