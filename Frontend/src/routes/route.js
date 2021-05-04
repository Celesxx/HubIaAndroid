import Index from "../components/pages/index.jsx";
import Graph from "../components/pages/graph.jsx";
import Data from "../components/pages/data.jsx";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
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
          <NavLink to="/data" activeClassName="active">
            <BottomNavigationAction
              icon={<StorageIcon style={{ color: "#48505a" }} />}
            />
          </NavLink>
          <NavLink exact to="/" activeClassName="active">
            <BottomNavigationAction
              icon={<CameraAltIcon style={{ color: "#48505a" }} />}
            />
          </NavLink>
          <NavLink to="/graph" activeClassName="active">
            <BottomNavigationAction
              icon={<PieChartIcon style={{ color: "#48505a" }} />}
            />
          </NavLink>
        </BottomNavigation>
      </div>
    </Router>
  );
}

export default indexRoute;
