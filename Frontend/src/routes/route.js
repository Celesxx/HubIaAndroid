import Index from "../components/pages/index.jsx";
import Graph from "../components/pages/graph.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";


function indexRoute()
{
    return(
        <Router>
            <Route path="/" exact component={Index}></Route>
            <Route path="/graph" exact component={Graph}></Route>
        </Router>
    );
}

export default indexRoute;
