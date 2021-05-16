import {NavLink} from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import React, { Component } from "react";

import "../../css/pages/navbar.css"
import StorageIcon from "@material-ui/icons/Storage";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PieChartIcon from "@material-ui/icons/PieChart";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default class Navbar extends Component 
{
    render()
    {
        return(

            <BottomNavigation className="bottombar">
                    
                <NavLink exact to="/gestionTag" activeClassName="active">
                    <BottomNavigationAction
                    icon={<StorageIcon style={{ color: "#48505a" }} />}
                    />
                </NavLink>

                <NavLink exact to="/gestionUser" activeClassName="active">
                    <BottomNavigationAction
                    icon={<StorageIcon style={{ color: "#48505a" }} />}
                    />
                </NavLink>

                <NavLink exact to="/" activeClassName="active">
                    <BottomNavigationAction
                    icon={<CameraAltIcon style={{ color: "#48505a" }} />}
                    />
                </NavLink>
                
                {/* <NavLink exact to="/graph" activeClassName="active">
                    <BottomNavigationAction
                    icon={<PieChartIcon style={{ color: "#48505a" }} />}
                    />
                </NavLink> */}

                <NavLink exact to="/login" activeClassName="active" onClick={() => localStorage.clear()}>
                    <BottomNavigationAction
                    icon={<ExitToAppIcon style={{ color: "#48505a" }} />}
                    />
                </NavLink>
            </BottomNavigation>
        )
    }
}