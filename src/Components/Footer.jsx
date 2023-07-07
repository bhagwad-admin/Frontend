import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full p-4 text-center bg-[#F4C43080] mt-5">
      <span className="text-white cursor-default">
        Designed & Developed by{" "}
        <a
          href="https://www.linkedin.com/in/sakshamsinghal20/"
          target="_blank"
          className="text-lg font-bold text-black"
        >
          Saksham Singhal
        </a>
      </span>
    </footer>
  );
};

export default Footer;
