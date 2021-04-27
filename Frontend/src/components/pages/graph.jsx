import React from "react";
import "../css/core.css";
import "../css/input.css";
import Bottombar from './components/bottom.bar';
import Paper from '@material-ui/core/Paper';
class graph extends React.Component 
{
    render()
    {
        return(

            <header className="body">

                <Paper elevation={3} style={{ 
                    margin: 50, 
                    backgroundColor: "#252C32",
                }}/>
            
                <Bottombar></Bottombar>
                
            </header>
        );
    }
}

export default graph;
