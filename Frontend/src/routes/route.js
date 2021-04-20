import Index from "../components/pages/index";
import { BrowserRouter as Router, Route } from "react-router-dom";


function indexRoute()
{
    return(
        <Router>
            <Route path="/" exact component={Index}></Route>
        </Router>
    );
}

export default indexRoute;
