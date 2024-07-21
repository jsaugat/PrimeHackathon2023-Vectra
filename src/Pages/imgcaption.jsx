import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera } from 'react-camera-pro';

// use gesture 
import { useDrag } from '@use-gesture/react';

import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
const headers = {
  "Authorization": "Bearer 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",
  "Content-Type": "application/octet-stream"
};

function ImgCaption() {
  const [caption, setCaption] = useState('');
  const camera = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const query = async (imageBlob) => {
    try {
      // Convert Blob to ArrayBuffer
      const arrayBuffer = await imageBlob.arrayBuffer();
      const response = await axios.post(API_URL, arrayBuffer, { headers });
      setCaption(response.data[0].generated_text);
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  const handleCapture = async () => {
    const imageBlob = await camera.current.takePhoto();
    const response = await fetch(imageBlob);
    const blob = await response.blob();
    query(blob);
  };

  // gesture function trigger
  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX > 100) {
      navigate('/home');
    } else if (swipeX < -100) {
      console.log(swipeX);
    }
  });

  console.log(location.pathname);

  return (
    <div {...bind()} className="App grid gap-4">
      <h1 className="text-2xl font-bold my-3 uppercase">Image Captioning</h1>
      <div className="camera-container">
        <Camera ref={camera} aspectRatio={16 / 9} facingMode="environment" />
      </div>
      <button onClick={handleCapture} className="px-3 p-1 bg-blue-500 text-white rounded-full my-2 mx-auto font-semibold flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
        <span>Capture and Get Caption</span>
      </button>
      {caption && <span className="w-fit font-semibold text-lg rounded-full p-2 my-3 mx-auto shadow-md flex gap-3 items-center">
        <svg className="text-blue-500 lucide lucide-info" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
        <p className="capitalize">
          {caption}
        </p>
      </span>}
    </div>
  );
}

export { ImgCaption };
