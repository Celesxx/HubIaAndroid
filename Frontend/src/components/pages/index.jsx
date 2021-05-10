import React from "react";
import "../css/core.css";
import "../css/input.css";
import Camera from './components/camera';
class index extends React.Component 
{
    render()
    {
        return(

            <header className="body">
            
                <Camera></Camera>
                
            </header>
        );
    }
}

export default index;
