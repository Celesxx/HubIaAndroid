import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { LoginAuthAction } from "../../redux/actions/auth.action";

import "../css/core.css";
import "../css/input.css";
import "../css/pages/login.css";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// function index()



function Login(props) 
{
    const { login } = props;
  
    const [errorHandler, setErrorHandler] = useState({
      hasError: false,
      message: "",
    });
  
    const [loginState, setLoginState] = useState({});
    const history = useHistory();
    return(

        <header errorHandler={errorHandler} className="body bodyLogin">
        
            <div className="contactBar">
            </div>
            <div className="headBar">
            </div>

            <div className="content">
                <div className="img">

                </div>

                <div className="formLogin">
                    <form onSubmit={(event) => 
                    {
                        event.preventDefault();
                        login(loginState, history, setErrorHandler);
                    }}>
                        <h3 className="formLogin-title">Connexion à Projet Hub N°1</h3>

                        <div className="formLogin-block ">
                            <input 
                                className="formLogin-block-input" 
                                type="email" 
                                name="email" 
                                placeholder="Enter email" 
                                onChange={(event) => 
                                {
                                    const email = event.target.value;
                                    setLoginState({ ...loginState, ...{ email } });
                                }}
                            />
                        </div>

                        <div className="formLogin-block ">
                            <input 
                                className="formLogin-block-input" 
                                type="password" 
                                name="password" 
                                placeholder="Enter password" 
                                onChange={(event) => 
                                {
                                    const password = event.target.value;
                                    setLoginState({ ...loginState, ...{ password } });
                                }}
                            />
                        </div>

                        <div className="formLogin-button">
                            <Button size="sm" color="danger" className="formLogin-submit-content" type="submit">Login</Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="licenceBar">
                <div className="licenceBar-body"></div>
            </div>
        </header>
    );
}    


const mapStateToProps = (state) => {
    return {
      user: state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (loginState, history, setErrorHandler) => {
        dispatch(LoginAuthAction(loginState, history, setErrorHandler));
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);
