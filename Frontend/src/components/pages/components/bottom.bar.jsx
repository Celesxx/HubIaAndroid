import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { BrowserRouter as Router, Link } from "react-router-dom";
import '../../css/pages/bottom.bar.css'


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Router>
      <BottomNavigation
        value={value} 
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showlabel
        className="bottombar"
      >
        <Link to="/a">
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        </Link>
        <Link to="/">
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </Link>
        <Link to="/graph">
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </Link>
      </BottomNavigation>
    </Router>
  );
}