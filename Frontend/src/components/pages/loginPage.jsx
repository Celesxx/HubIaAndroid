import React from "react";
//import "../css/core.css";
//import "../css/input.css";
import "../css/pages/loginPage.css"
import {getDatas} from "../../services/dataRequest.js"

class loginPage extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {login: '',
                  password: ''};
    
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    

    handleChangeLogin(event) {
        this.setState({login: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Le login est : ' + this.state.login + ' Le mot de passe est : ' + this.state.password);
    //     getDatas(this.state.login).then((res) =>
    //     console.log("Résultat réponse" + res))
    }

    render()
    {
        return(

            <div className="c">
            
                <header>
                    <h1>HubIaAndroid</h1>
                </header>
                <main>
                    <form id="formLogin" onSubmit={this.handleSubmit}>
                        <label for="login">Login :</label><br></br>
                        <input type="text" id="login" value={this.userame} onChange={this.handleChangeLogin}></input><br></br>
                        <label for="password">Password :</label><br></br>
                        <input type="password" id="password" value={this.password}onChange={this.handleChangePassword}></input><br></br>
                        <div id="submit">
                            <button type="submit" value="Submit">login</button>
                        </div>
                    </form>
                </main>
                <footer>
                    <p>Coopyright</p>
                </footer>
                
            </div>
        );
    }
}

export default loginPage;