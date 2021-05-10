// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../../function/utilities.function";
import { record } from "../../function/tag.function";

function Camera() 
{
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [response, setResponse] = useState("");

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

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    // socket.on("image", data => {
    //   setResponse(data);
    // });
    runCoco();
  }, []);

  return (
    <div className="Camera">
      <header className="Camera-header">
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
            width: 1024,
            height: 576,
          }}
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
            width: 1024,
            height: 576,
          }}
        />
      </header>
    </div>
  );
}

export default Camera;
