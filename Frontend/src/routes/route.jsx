import Index from "../components/pages/index.jsx";
import Graph from "../components/pages/graph.jsx";
import Data from "../components/pages/data.jsx";
import Login from "../components/pages/login";
import GestionTag from "../components/pages/gestionTag.jsx";
import GestionUser from "../components/pages/gestionUser.jsx";
import ProtectedRoute from "./protected.route";
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
          <ProtectedRoute path="/data" exact component={Data}></ProtectedRoute>
          <ProtectedRoute path="/graph" exact component={Graph}></ProtectedRoute>
          <ProtectedRoute path="/"exact component={Index}></ProtectedRoute>
          <Route path="/login" exact component={Login}></Route>
          <ProtectedRoute path="/gestionTag" exact component={GestionTag}></ProtectedRoute>
          <ProtectedRoute path="/gestionUser" exact component={GestionUser}></ProtectedRoute>
        </Switch>
    </Router>
  );
}

export default indexRoute;
