import React from "react";
import "../css/core.css";
import "../css/input.css";
import Camera from './components/camera';
import Bottombar from './components/bottom.bar';
class index extends React.Component 
{
    render()
    {
        return(

            <header className="body">
            
                <Bottombar></Bottombar>
                <Camera></Camera>
                
            </header>
        );
    }
}

export default index;
