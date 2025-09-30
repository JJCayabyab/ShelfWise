import React from "react";
import { useState } from "react";
import winterLogo from "../../public/winterLogo.svg";
import sunsetLogo from "../../public/sunsetLogo.svg";
import { Link, useResolvedPath } from "react-router-dom";
import { useThemeStore } from "../store/themeSelector";
import BookFormModal from "./BookFormModal";
import { useBookStore } from "../store/bookStore";
const Navbar = () => {
  const { addBook } = useBookStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  //to check if we are on home page
  const { pathname } = useResolvedPath();
  const isHome = pathname === "/";
  const mode = "add";
  console.log(pathname);

  return (
    <>
      <div
        className={`shadow-md w-screen py-3 flex px-5 items-center justify-between
     sm:px-7 md:px-14 lg:px-14 xl:px-36 ${
       theme === "winter" ? "bg-blue-50" : "bg-[#1a1a28]"
     }`}
      >
        <Link to={"/"}>
          <div className="flex gap-2 items-center">
            <img
              src={theme === "winter" ? winterLogo : sunsetLogo}
              className="size-12"
            />
            <h1
              className={`text-2xl font-bold bg-gradient-to-r ${
                theme === "winter"
                  ? "from-teal-500 to-indigo-600"
                  : "from-orange-500 to-yellow-600"
              } bg-clip-text text-transparent`}
            >
              {" "}
              ShelfWise
            </h1>
          </div>
        </Link>
        <div className="flex gap-3 items-center">
          <label className="toggle w-15 h-8 border-2 text-base-content ">
            <input
              checked={theme === "sunset"}
              onChange={toggleTheme}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
          {isHome && (
            <button onClick={() => setIsOpen(true)} className="btn btn-primary">
              Add Book
            </button>
          )}
        </div>
      </div>
      <BookFormModal
        isOpen={isOpen}
        mode={mode}
        onClose={() => setIsOpen(false)}
        addBook={addBook}
      />
    </>
  );
};

export default Navbar;
