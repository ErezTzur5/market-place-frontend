import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Button from "./ui/Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white border z-50 relative">
        <div className="max-w-7xl mx-[16%] px-2 sm:px-6">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center xl:hidden"></div>
            <div className="flex-1 flex items-center justify-between sm:items-stretch">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <img
                    className="h-6 w-30 p-1 mt-2"
                    src="../images/logo.svg"
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="hidden xl:flex space-x-4">
                <Link
                  to="/login"
                  className="text-black font-semibold hover:bg-gray-700 hover:text-white px-6 py-2 text-sm font-small border border-black uppercase"
                  onClick={toggleMenu}
                >
                  login
                </Link>
              </div>

              <div className="xl:hidden flex space-x-4">
                {isOpen ? (
                  <svg
                    onClick={toggleMenu}
                    className="w-8 h-8 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="#FFF"
                        stroke="#2C2830"
                        strokeWidth="1.5"
                        d="M.75.75h30.5v30.5H.75z"
                      />
                      <g fill="#2C2830">
                        <path d="M10.873 9.563l11.314 11.314-1.06 1.06L9.813 10.623z" />
                        <path d="M9.813 20.877L21.127 9.563l1.06 1.06-11.314 11.314z" />
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    onClick={toggleMenu}
                    className="w-8 h-8 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="#FFF"
                        stroke="#2C2830"
                        strokeWidth="1.5"
                        d="M.75.75h30.5v30.5H.75z"
                      />
                      <g fill="#2C2830">
                        <path d="M8 10h16v1.5H8zM8 15h16v1.5H8zM8 20h16v1.5H8z" />
                      </g>
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="xl:hidden fixed inset-0 bg-[#2B282F] flex flex-col justify-center items-center z-30">
          <ul className="text-white text-center space-y-4">
            <li className="cursor-pointer uppercase" onClick={toggleMenu}>
              how we work
            </li>
            <li className="cursor-pointer uppercase" onClick={toggleMenu}>
              blog
            </li>
            <li className="cursor-pointer pb-3 uppercase" onClick={toggleMenu}>
              account
            </li>
          </ul>
          {/* <Link to="/login">
            <Button
              text="login"
              className="border-white text-white font-semibold hover:bg-white hover:text-black cursor-pointer absolute top-[7rem] right-[5rem] max-xl:static"
              onClick={toggleMenu}
            />
          </Link> */}
        </div>
      )}
    </>
  );
}

export default Navbar;
