import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import adhyayData from "../Content/Adhyay/index.json";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setNavbar(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const location = useLocation();

  if (location.pathname === "/") {
    // If the route starts with '/admin', do not render the navbar
    return null;
  }

  return (
    <nav className="w-full bg-[#F4C43080] ">
      <div className="justify-center px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 md:py-3">
        <div>
          <div className="flex items-center justify-end py-3 md:py-5 md:block h-12">
            {/* <a href="javascript:void(0)">
              <img src="/Assets/logo.png" className="h-12" />
            </a> */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-20 md:space-y-0">
              <li
                className={`${
                  location.pathname == "/"
                    ? `text-black border-b-4 border-black rounded`
                    : `text-white`
                } hover:text-black font-semibold hover:border-b-4 pb-1 hover:border-black hover:rounded w-fit`}
              >
                <NavLink to="/">Home</NavLink>
              </li>
              <li
                className={`${
                  location.pathname == "/about"
                    ? `text-black border-b-4 border-black rounded`
                    : `text-white`
                } w-fit relative group`}
              >
                <button
                  type="button"
                  className="text-white hover:text-gray-200  py-1 rounded flex items-center focus:outline-none"
                  onClick={toggleMenu}
                >
                  <span
                    className={` hover:text-black font-semibold hover:border-b-4 pb-1 hover:border-black hover:rounded w-fit mr-1`}
                  >
                    Adhyay
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`absolute left-0 mt-2 w-48 bg-[#f4c330f7] rounded-md shadow-lg overflow-y-auto max-h-48  ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {adhyayData.chapters.map((adhyay) => (
                    <li key={adhyay.id} className="px-4">
                      <Link
                        to={`/chapters/${adhyay.id}`}
                        onClick={() => {
                          setMenuOpen(false);
                          handleClick();
                        }}
                        className={`${
                          location.pathname == `/adhyay/${adhyay.id}`
                            ? `text-black border-b-4 border-black rounded`
                            : `text-white`
                        } hover:text-black font-semibold hover:border-b-4 pb-1 hover:border-black hover:rounded w-fit mr-1  py-5 block`}
                      >
                        {adhyay.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li
                className={`${
                  location.pathname == "/meanings"
                    ? `text-black border-b-4 border-black rounded`
                    : `text-white`
                } hover:text-black font-semibold hover:border-b-4 pb-1 hover:border-black hover:rounded w-fit`}
              >
                <Link to="/meanings" onClick={handleClick}>
                  Shabdkosh
                </Link>
              </li>
              <li
                className={`${
                  location.pathname == "/blogs"
                    ? `text-black border-b-4 border-black rounded`
                    : `text-white`
                } hover:text-black font-semibold hover:border-b-4 pb-1 hover:border-black hover:rounded w-fit`}
              >
                <Link to="/blogs" onClick={handleClick}>
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
