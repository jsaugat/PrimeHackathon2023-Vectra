// imgcaption.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera } from 'react-camera-pro';


// use gesture 
import { useDrag } from '@use-gesture/react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
    const binnd = useDrag( ({ swipe:[swipeX]} )=>{
      if (swipeX > 100) {
       navigate('/home');
      } else if( swipeX < -100) {
        console.log(swipeX);

      }
    } );

    console.log(location.pathname);


    return (
      <div onClick={ handleCapture }  className="relative">
      <div className="camera-gesture h-auto wrap bg">
        <div style={{height:"100%"}} className='camera_section' >
        <Camera ref={camera} aspectRatio={16 / 9} facingMode="environment" />        
        {caption && <p className='py-10 bg-blue-900 ' >{caption}</p>}
        </div>
        
      </div>
     
      </div>
    );
}

export { ImgCaption };
