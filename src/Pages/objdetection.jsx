import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "../App.css";

let currentUtterance = null;
let utteranceTimeout = null;

const drawRect = (detections, ctx, setCurrentData) => {
  const canvasWidth = ctx.canvas.width;

  detections.forEach(prediction => {
    const [x, y, width, height] = prediction['bbox'];
    const text = prediction['class'];

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

    const color = "0000FF";
    ctx.strokeStyle = '#' + color;
    ctx.font = '20px Arial';

    ctx.beginPath();
    ctx.fillStyle = '#' + color;
    ctx.fillText(`${text} [position: ${position}] [distance: ${distance}]`, x, y > 10 ? y - 5 : y + 15);
    ctx.rect(x, y, width, height);
    ctx.stroke();

    setCurrentData({ text, position, distance });

    if (currentUtterance) {
      window.speechSynthesis.cancel();
      clearTimeout(utteranceTimeout);
    }

    const message = `${text} detected at ${position} and it is ${distance}`;
    currentUtterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(currentUtterance);

    utteranceTimeout = setTimeout(() => {
      if (currentUtterance) {
        window.speechSynthesis.cancel();
        currentUtterance = null;
      }
    }, 6000); // Pause after 10 seconds
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
  const [currentData, setCurrentData] = useState({ text: '', position: '', distance: '' });
  const [net, setNet] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await cocossd.load();
      setNet(model);
      console.log("COCO-SSD model loaded.");
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (net) {
      const detect = async () => {
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ) {
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;

          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;

          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          const obj = await net.detect(video);

          const ctx = canvasRef.current.getContext("2d");
          drawRect(obj, ctx, setCurrentData);
        }
        requestAnimationFrame(detect);
      };
      detect();
    }
  }, [net]);

  useEffect(() => {
    console.log(currentData.text)
    if (currentData.text) {
      const { text, position, distance } = currentData;
      const message = `${text} detected at ${position} and it is ${distance}`;
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentData]);

  useEffect(() => {
    const message = "Object Detection page";
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);

    // Cleanup function to cancel speech synthesis on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

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
            zIndex: 9,
            width: "100%",
            height: 330,
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
            zIndex: 10,
            width: "100%",
            height: 360,
          }}
        />
      </header>
    </div>
  );
}

export default ObjDetection;
