import React from 'react';
import "./App.css";
import { ImgCaption } from './Pages/imgcaption.jsx'; // Adjust the path if needed
import ObjDetection from './Pages/objdetection.jsx'; // Adjust the path if needed
import Location from './Pages/location.jsx'; // Adjust the path if needed
import './App.css'; // Optional, for additional styles
import Header from './Components/Header.jsx'; // Ensure the correct path
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import VoiceAssist from './Components/VoiceAssist.jsx';
import { SpeechToText } from './Pages/SpeechtoText.jsx';

import Gesture from './Components/Gesture.jsx';


// test modes
import TestMode1 from './Components/TestMode1.jsx';
import TestMode2 from './Components/TestMode2.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header />
        <VoiceAssist />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/objectdetection' element={<ObjDetection />} />
            <Route path='/imgcaption' element={<ImgCaption />} />
            <Route path='/location' element={<Location />} />
            <Route path='/speechtotext' element={<SpeechToText />} />
            {/* Add more routes here if needed */}
          </Routes>
        </div>

        <div style={{ height: "55vh" }} className='gesture_wrap' >
          <Gesture />
        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;
