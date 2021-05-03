import Index from "../components/pages/index.jsx";
import Graph from "../components/pages/graph.jsx";
import Data from "../components/pages/data.jsx";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import StorageIcon from "@material-ui/icons/Storage";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PieChartIcon from "@material-ui/icons/PieChart";

import "../components/css/pages/bottomnav.css";

function indexRoute() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/data">
            <Data />
          </Route>
          <Route path="/graph">
            <Graph />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
        <BottomNavigation className="bottombar">
          <Link to="/data">
            <BottomNavigationAction icon={<StorageIcon />} />
          </Link>
          <Link to="/">
            <BottomNavigationAction icon={<CameraAltIcon />} />
          </Link>
          <Link to="/graph">
            <BottomNavigationAction icon={<PieChartIcon />} />
          </Link>
        </BottomNavigation>
      </div>
    </Router>
  );
}

export default indexRoute;
