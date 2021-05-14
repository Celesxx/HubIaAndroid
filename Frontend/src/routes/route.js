import Index from "../components/pages/index.jsx";
import Graph from "../components/pages/graph.jsx";
import Data from "../components/pages/data.jsx";
import GestionTag from "../components/pages/gestionTag.jsx";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";


function indexRoute() {
  return (
    <Router>
        <Switch>

          <Route path="/data" exact component={Data}></Route>
          <Route path="/graph" exact component={Graph}></Route>
          <Route path="/"exact component={Index}></Route>
          <Route path="/gestionTag" exact component={GestionTag}></Route>

        </Switch>
    </Router>
  );
}

export default indexRoute;
