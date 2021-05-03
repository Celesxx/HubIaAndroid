import Index from "../components/pages/index.jsx";
import loginPage from "../components/pages/loginPage.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";


function indexRoute()
{
    return(
        <Router>
            <Route path="/" exact component={Index}></Route>
            <Route path="/loginPage" exact component={loginPage}></Route>
        </Router>
    );
}

export default indexRoute;
