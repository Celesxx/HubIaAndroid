import React, { Component, useRef } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawRect } from "../../function/utilities.function";
import { record } from "../../function/tag.function";
import "../../css/pages/camera.css"
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
    }


    render()
    {
        // const {totalDetection, scorePersonn, scorePhone} = this.state
        const webcamRef = this.webcamRef
        const canvasRef = this.canvasRef    

        const runCoco = async () => 
        {
            const net = await cocossd.load();
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
            // if(rows.length != 0) 
            // {
            //     // let inRow = false
            //     for(let element in rows)
            //     {
            //         if(element.Type === obj[0].class)
            //         {
            //             // inRow = true
            //             let array = element.score
            //             array.push(obj[0].score)
            //             const average = list => list.reduce((prev, curr) => prev + curr) / list.length;

            //             this.setState(prevState => ({...prevState, rows:{...prevState.totalScore, totalScore : average(array)}}))
            //             this.setState(prevState => ({...prevState, rows:{...prevState.Nbr, Nbr : element.Nbr + 1}}))
            //         }
            //     }
            
                // if(inRow == false)
                // {
                //     let newRow = { Type : obj[0].class, Nbr : 1, scoreMoyen : obj[0].score }
                //     this.setState(rows.push(newRow))
                // }
            // } else
            // {
            //     let newRow = [{ Type : obj[0].class, Nbr : 1, scoreMoyen : obj[0].score }]

            //     this.setState({rows : newRow})
            // }
            
            // Draw mesh

            // this.setState({totalDetection : totalDetection + 1})
            // try{
            //     if(obj[0].class == "person") this.setState({scorePersonn : scorePersonn + 1})
            //     else if(obj[0].class == "cell phone") this.setState({scorePhone : scorePhone + 1})
            // }catch (error) 
            // {
            //   console.log(`une erreur est survenue lors de l'enregistrement de la détection avec le message : ${error}`)
            // }
           

            const ctx = canvasRef.current.getContext("2d");

            drawRect(obj, ctx);
            }
        };

        runCoco();


        return(
            <div className="camera-header">

                <div className="camera-content">
                    <Webcam ref={webcamRef} muted={true} className="camera-content-webcam" />
                    <canvas ref={canvasRef} className="camera-content-canvas" />  
                </div>

                {/* <div className="tab">
                    <p>Total de détection : {totalDetection}</p>
                    <p>Détection de personne : {scorePersonn}</p>
                    <p>Détection de téléphone : {scorePhone}</p> */}
                    {/* <Paper elevation={3} className="paper">
                        <DataGrid
                            dataSource={rows}
                            showColumnLines={showColumnLines}
                            showRowLines={showRowLines}
                            showBorders={showBorders}
                            rowAlternationEnabled={rowAlternationEnabled}>

                            <Paging defaultPageSize={5} />
                            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} showInfo={true} />

                            <Column dataField="Type" width={50}/>
                            <Column dataField="Nbr" width={350}/>
                            <Column dataField="ScoreMoyen" width={750}/>
                        </DataGrid>
                    </Paper> */}
                {/* </div> */}
            </div>
        )
    }
}

export default Camera 