import React from "react";
//import "../css/core.css";
//import "../css/input.css";
import "../css/pages/loginPage.css"
// import {getDatas} from "../../services/dataRequest.js"

class loginPage extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {login: '',
                      password: ''};
    
        //this.handleChangeLogin = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChangeLogin(event) {
        //this.setState({login: event.target.login});
    }

    handleChangePassword(event) {
        //this.setState({password: event.target.password});
    }

    handleSubmit(event) {
        alert('Le login est : ' + this.state.login + 'Le mot de passe est : ' + this.state.password);
        event.preventDefault();
    }

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
                        <input type="text" id="login" value={this.state.login} onChange={this.handleChangeLogin()}></input><br></br>
                        <label for="password">Password :</label><br></br>
                        <input type="password" id="password" value={this.state.password} onChange={this.handleChangePassword()}></input><br></br>
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