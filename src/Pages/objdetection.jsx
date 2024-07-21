import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "../App.css";

const drawRect = (detections, ctx) => {
  // Get canvas width
  const canvasWidth = ctx.canvas.width;

  // Loop through each prediction
  detections.forEach(prediction => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox'];
    const text = prediction['class'];

    // Determine object position
    const objectCenterX = x + width / 2;
    let position;
    if (objectCenterX < canvasWidth / 3) {
      position = "left";
    } else if (objectCenterX < (2 * canvasWidth) / 3) {
      position = "center";
    } else {
      position = "right";
    }

    const area = width * height;
    let distance;
    if (area < 40000) {
      distance = "far";
    } else if (area < 70000) {
      distance = "medium";
    } else {
      distance = "close";
    }

    // Set styling
    const color = "0000FF";
    ctx.strokeStyle = '#' + color;
    ctx.font = '20px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#' + color;
    ctx.fillText(`${text} [position: ${position}] [distance: ${distance}]`, x, y > 10 ? y - 5 : y + 15); // Adjust text position
    ctx.rect(x, y, width, height);
    ctx.stroke();

    // Voice feedback
    const message = `${text} detected at ${position} and is ${distance}`;
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  });
}

const videoConstraints = {
  width: { min: 480 },
  height: { min: 720 },
  facingMode: { exact: "environment" }
};

function ObjDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App overflow-y-hidden h-full ">
      <header className="App-header h-full">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: "100%",
            height: 360,
          }}
          // videoConstraints={videoConstraints}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: "100%",
            height: 360,
          }}
        />
      </header>
    </div>
  );
}

export default ObjDetection;
