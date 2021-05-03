import React from "react";
//import "../css/core.css";
//import "../css/input.css";
import "../css/pages/loginPage.css"
class loginPage extends React.Component 
{
    render()
    {
        return(

            <div className="c">
            
                <header>
                    <h1>HubIaAndroid</h1>
                </header>
                <main>
                    <div id="inputLogin">
                        <label for="login">Login :</label><br></br>
                        <input type="text" id="login"></input><br></br>
                        <label for="password">Password :</label><br></br>
                        <input type="password" id="password"></input><br></br>
                        <button>login</button>
                    </div>
                </main>
                <footer>
                    <p>Coopyright</p>
                </footer>
                
            </div>
        );
    }
}

export default loginPage;
