import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./Constant.js";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const BlogsContainer = () => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    console.log("URL", BASE_URL);
    await axios
      .get(`${BASE_URL}/api/blogs`)
      .then((res) => {
        // console.log(res.data.data);

        const sortedItems = [...res.data.data].sort((a, b) => {
          const dateA = new Date(a.attributes.createdAt);
          const dateB = new Date(b.attributes.createdAt);

          return dateB - dateA;
        });

        // console.log("sorted", sortedItems);

        setBlogData(sortedItems);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full mt-10 flex justify-center items-center min-h-[74vh]">
        <div className="flex min-h-[50vh] w-[80%] bg-[#FFFFFF99] rounded-md px-3 md:px-8 py-8 md:py-4   flex-col items-center space-y-8">
          <h2 className="text-3xl font-bold cursor-default">Blogs</h2>
          <div className="flex flex-col mt-3 w-full items-center space-y-8">
            {blogData.map((blog, index) => {
              return (
                <Link
                  to={`/blog/${blog.id}`}
                  key={index}
                  className="text-2xl md:text-xl border-b-2 border-dashed border-black w-full py-7 text-center cursor-pointer hover:font-semibold"
                >
                  {blog.attributes.Title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : null}
    </>
  );
};

export default BlogsContainer;
