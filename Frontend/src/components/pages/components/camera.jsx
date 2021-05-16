import React, { Component, useRef } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawRect } from "../../function/utilities.function";
import { record } from "../../function/tag.function";
import "../../css/pages/camera.css"
import { io } from "socket.io-client";
import Paper from "@material-ui/core/Paper";
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';


class Camera extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            // scorePersonn: 0,
            // scorePhone: 0,
            // totalDetection : ,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            rowAlternationEnabled: true
        };

        this.webcamRef = React.createRef(null);
        this.canvasRef = React.createRef(null);
        this.canvasRefApp = React.createRef(null)
    }


    render()
    {
        // const {totalDetection, scorePersonn, scorePhone} = this.state
        const webcamRef = this.webcamRef
        const canvasRef = this.canvasRef    
        const canvasRefApp = this.canvasRefApp    

        const runCoco = async () => 
        {
            const net = await cocossd.load();
            setInterval(() => 
            {
                detect(net);
                // detectApp(net);
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

            const ctx = canvasRef.current.getContext("2d");

            drawRect(obj, ctx);
            }
        };

        // const detectApp = async (net) => {
        //     // Check data is available
        //     var img = document.getElementById("image");
        //     if (!img.src || !img.src.length || img.src.length === 0) 
        //     {
        //         // Get Video Propertie
        //         const video = img.src;
        //         const videoWidth = img.clientWidth;
        //         const videoHeight = img.clientHeight;

        //         // Set canvas height and width
        //         canvasRefApp.current.width = videoWidth;
        //         canvasRefApp.current.height = videoHeight;

        //         // Send video to IA
        //         const obj = await net.detect(video);

        //         const ctx = canvasRefApp.current.getContext("2d");

        //         drawRect(obj, ctx);
        //     }
        // };

        runCoco();

        const socket = io('http://localhost:4000/', { transports: ["websocket"] })
        socket.on("image", data => {
            console.log("received image to front : ", data)
            const image = document.getElementById('image')
            image.src = `data:image/jpeg;base64,${data}`
        })

        return(
            <div className="camera-header">

                <div className="camera-content">
                    <Webcam ref={webcamRef} muted={true} className="camera-content-webcam" />
                    <canvas ref={canvasRef} className="camera-content-canvas" />  
                </div>

                <div className="camera-app">
                    <img id="image" className="camera-app-img"/>
                    <canvas ref={canvasRefApp} className="camera-content-canvas" /> 
                </div>
            </div>
        )
    }
}

export default Camera 