import React, { useState, useEffect } from 'react';
import "./App.css";
import { ImgCaption } from './Pages/imgcaption.jsx'; // Adjust the path if needed
import ObjDetection from './Pages/objdetection.jsx'; // Adjust the path if needed
import Location from './Pages/location.jsx'; // Adjust the path if needed
import './App.css'; // Optional, for additional styles
import Header from './Components/Header.jsx'; // Ensure the correct path
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpeechToText } from './Pages/SpeechtoText.jsx';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgpu';

import Gesture from './Components/Gesture.jsx';

function App() {
  const [tfReady, setTfReady] = useState(false);

  useEffect(() => {
    // Define the main function to run once TensorFlow.js is ready
    const main = async () => {
      console.log('TensorFlow.js is ready with WebGPU backend.');
      // Load models or initialize other TensorFlow.js related functionality here
      setTfReady(true); // Indicate TensorFlow.js is ready
    };

    // Set the backend to WebGPU and wait for it to be ready
    const initTf = async () => {
      await tf.setBackend('webgpu');
      await main();
    };

    initTf().catch(err => {
      console.error('Failed to initialize TensorFlow.js:', err);
    });

  }, []); // Empty dependency array ensures this runs once on mount

  if (!tfReady) {
    return <div>Loading TensorFlow.js...</div>; // Optional: Show loading state
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* <VoiceAssist /> */}
        <div style={{ height: "240px" }} >
          <Routes>
            <Route path='/' element={<ObjDetection />} />
            <Route path='/imgcaption' element={<ImgCaption />} />
            <Route path='/location' element={<Location />} />
            <Route path='/speechtotext' element={<SpeechToText />} />
            {/* Add more routes here if needed */}
          </Routes>
        </div>

        <div style={{ height: "55vh" }} className='relative gesture_wrap' >
          <Gesture />
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
