// import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as cocossd from "@tensorflow-models/coco-ssd";
// import Webcam from "react-webcam";
// import "../App.css";

// const drawRect = (detections, ctx) => {
//   // Get canvas width
//   const canvasWidth = ctx.canvas.width;

//   // Loop through each prediction
//   detections.forEach(prediction => {
//     // Extract boxes and classes
//     const [x, y, width, height] = prediction['bbox'];
//     const text = prediction['class'];

//     // Determine object position
//     const objectCenterX = x + width / 2;
//     let position;
//     if (objectCenterX < canvasWidth / 3) {
//       position = "Left";
//     } else if (objectCenterX < (2 * canvasWidth) / 3) {
//       position = "Center";
//     } else {
//       position = "Right";
//     }

//     // Set styling
//     const color = Math.floor(Math.random() * 16777215).toString(16);
//     ctx.strokeStyle = '#' + color;
//     ctx.font = '18px Arial';

//     // Draw rectangles and text
//     ctx.beginPath();
//     ctx.fillStyle = '#' + color;
//     ctx.fillText(`${text} (${position})`, x, y > 10 ? y - 5 : y + 15); // Adjust text position
//     ctx.rect(x, y, width, height);
//     ctx.stroke();
//   });
// }


// function ObjDetection() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Main function
//   const runCoco = async () => {
//     const net = await cocossd.load();
//     console.log("Handpose model loaded.");
//     //  Loop and detect hands
//     setInterval(() => {
//       detect(net);
//     }, 10);
//   };

//   const detect = async (net) => {
//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       // Get Video Properties
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       // Set video width
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       // Set canvas height and width
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // Make Detections
//       const obj = await net.detect(video);

//       // Draw mesh
//       const ctx = canvasRef.current.getContext("2d");
//       drawRect(obj, ctx); 
//     }
//   };

//   useEffect(()=>{runCoco()},[]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true} 
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default ObjDetection;


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
      position = "Left";
    } else if (objectCenterX < (2 * canvasWidth) / 3) {
      position = "Center";
    } else {
      position = "Right";
    }

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = '#' + color;
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#' + color;
    ctx.fillText(`${text} (${position})`, x, y > 10 ? y - 5 : y + 15); // Adjust text position
    ctx.rect(x, y, width, height);
    ctx.stroke();
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
    <div className="App">
      <header className="App-header">
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
            width: 640,
            height: 480,
          }}
          videoConstraints={videoConstraints}
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
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default ObjDetection;
