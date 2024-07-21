import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera } from 'react-camera-pro';

const CAPTION_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
const CAPTION_API_HEADERS = {
  "Authorization": "Bearer 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",
  "Content-Type": "application/octet-stream"
};

function ImgCaption() {
    const [caption, setCaption] = useState('');
    const camera = useRef(null);

    const queryCaption = async (imageBlob) => {
        try {
            // Convert Blob to ArrayBuffer
            const arrayBuffer = await imageBlob.arrayBuffer();
            const response = await axios.post(CAPTION_API_URL, arrayBuffer, { headers: CAPTION_API_HEADERS });
            const captionText = response.data[0].generated_text;
            setCaption(captionText);
            speakText(captionText);  // Call text-to-speech function
        } catch (error) {
            console.error("Error making request:", error);
        }
    };

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en';  // Set language to English or adjust as needed
        window.speechSynthesis.speak(utterance);
    };

    const handleCapture = async () => {
        const imageBlob = await camera.current.takePhoto();
        const response = await fetch(imageBlob);
        const blob = await response.blob();
        queryCaption(blob);
    };

    return (
        <div onClick={ handleCapture } className="App">
            <div className="camera-container">
                <Camera ref={camera} aspectRatio={16 / 9} facingMode="environment" />
            </div>
        </div>
    );
}

export { ImgCaption };