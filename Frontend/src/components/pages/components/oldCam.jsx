// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../../function/utilities.function";
import { record } from "../../function/tag.function";
import "../../css/pages/camera.css"

function Camera() 
{
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => 
  {
    const net = await cocossd.load();
    //  Loop and detect hands
    setInterval(() => 
    {
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

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Send video to IA
      const obj = await net.detect(video);


      record(obj, webcamRef)
     
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx);
    }
  };

  useEffect(() =>
  {
    runCoco();
  }, []);

  return (
    <div className="camera-header">
      <div className="camera-content">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="camera-content-webcam"
        />

        <canvas
          ref={canvasRef}
          className="camera-content-canvas"
        />
      </div>

      <div className="tab"></div>
    </div>
  );
}

export default Camera;
