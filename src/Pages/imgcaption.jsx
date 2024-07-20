// imgcaption.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera } from 'react-camera-pro';

const API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
const headers = {
  "Authorization": "Bearer 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",
  "Content-Type": "application/octet-stream"
};

function ImgCaption() {
    const [caption, setCaption] = useState('');
    const camera = useRef(null);
  
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
    return (
      <div className="App">
        <h1>Image Captioning</h1>
        <div className="camera-container">
          <Camera ref={camera} aspectRatio={16 / 9} facingMode="environment" />
        </div>
        <button onClick={handleCapture}>Capture and Get Caption</button>
        {caption && <p>{caption}</p>}
      </div>
  );
}

export { ImgCaption };
