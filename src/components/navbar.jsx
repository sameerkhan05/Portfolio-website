import logo from "../assets/kevinRushLogo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-10 cursor-pointer" src={logo} alt="logo" />
      </div>
      <div className="m-8 flex items-center justify-center gap-4 cursor-pointer">
        <a
          href="https://github.com/sameerkhan05"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sameer-khan-ba13641ba/"
          target="_blank"
          rel="noreferrer"
        >
        <FaLinkedin />
        </a>
        <a
          href="https://leetcode.com/u/sameerkhanyt09/"
          target="_blank"
          rel="noreferrer"
        >
        <FaSquareXTwitter />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
