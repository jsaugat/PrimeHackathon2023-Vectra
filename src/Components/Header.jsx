import React from 'react';
import { Link } from 'react-router-dom';
import { CircleDollarSign, Home, Image, MapPinned } from 'lucide-react';

const Header = () => {
  return (
    <nav className="bg-black border-t border-gray-200">
      <div className="flex justify-around">
        <Link className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2" to="/">
          <div className="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500">
            <Home />
            <p className="text-sm pt-2">Object</p>
          </div>
        </Link>

        <Link className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2" to="/imgcaption">
          <div className="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500">
            <CircleDollarSign />
            <p className="text-sm pt-2">Money</p>
          </div>
        </Link>

        <Link className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2" to="/location">
          <div className="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500">
            <MapPinned />
            <p className="text-sm pt-2">Map</p>
          </div>
        </Link>

        <Link className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2" to="/speechtotext">
          <div className="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500">
            <Image />
            <p className="text-sm pt-2">Gallery</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
