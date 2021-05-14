import React from "react";
import "../css/core.css";
import "../css/input.css";
import Camera from './components/camera';
import Navbar from './components/navbar';
class index extends React.Component 
{
    render()
    {
        return(

            <header className="body">
            
                <Camera></Camera>
                <Navbar></Navbar>
                
            </header>
        );
    }
}

export default index;
