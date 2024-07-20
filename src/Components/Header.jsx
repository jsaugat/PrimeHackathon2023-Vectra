import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// icons 
import { CircleDollarSign, Home, Image, MapPinned } from 'lucide-react';


// import testMode1 from './Components/TestMode1.jsx';
import { useLocation } from 'react-router-dom';




const Header = () => {


  return (
    <nav class=" bg-black border-t border-gray-200">
    <div class="flex justify-around">
    <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/home"
                >
        <div  class="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500" onclick="showSection('home')">
            <Home />
         
                  <p className='text-sm pt-2 ' >Object</p>
        </div>
        </Link>
        <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/imgcaption"
                >
        <div  class="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500" onclick="showSection('search')">
        <CircleDollarSign />
          
        <p className='text-sm pt-2 ' >Monkey</p>
        </div>
        </Link>

        <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/testmode1"
                >
        <div  class="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500" onclick="showSection('notifications')">
        <MapPinned />
          
        <p className='text-sm pt-2 ' >Map</p>
        </div>
        </Link>

        <Link
                  className="block text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  to="/testmode2"
                >
        <div  class="flex flex-col items-center p-2 text-white hover:text-blue-500 active:text-blue-500" onclick="showSection('profile')">
        <Image />
          
        <p className='text-sm pt-2 ' >Gallery</p>
               
        </div>
        </Link>
    </div>
</nav>
  );
};

export default Header;
