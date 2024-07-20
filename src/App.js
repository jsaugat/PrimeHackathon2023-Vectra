import React from 'react';
import "./App.css";
import { ImgCaption } from './Pages/imgcaption.jsx'; // Adjust the path if needed
import ObjDetection from './Pages/objdetection.jsx'; // Adjust the path if needed
import './App.css'; // Optional, for additional styles
import Header from './Components/Header.jsx'; // Ensure the correct path
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';

import Gesture from './Components/Gesture.jsx';


// test modes
import TestMode1 from './Components/TestMode1.jsx';
import TestMode2 from './Components/TestMode2.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header />

       <div style={ {height:"320px"} } className='all_div_wrap' >
       <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/imgcaption' element={<ImgCaption />} />
          <Route path='/testmode1' element={<TestMode1 />} />
          <Route path='/testmode2' element={<TestMode2 />} />
          {/* Add more routes here if needed */}
        </Routes>
        </div>

      <div style={{height:"55vh"}} className='gesture_wrap' >
        <Gesture/>
      </div>  

      </BrowserRouter>
    </div>
  );
}

export default App;
