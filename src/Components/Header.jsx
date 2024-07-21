import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-md dark:bg-gray-800 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">

          <div
            className=" lg:flex lg:w-full lg:items-center lg:justify-between"
            id="navbarSupportedContent"
          >
            <ul className="flex flex-col lg:flex-row">
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <a
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  href="#!"
                >
                  Features
                </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/objectdetection"
                >
                  Object Detection
                </Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/imgcaption"
                >
                  Image Caption
                </Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/location"
                >
                  Location
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
