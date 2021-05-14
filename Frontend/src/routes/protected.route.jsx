import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import * as LoginRequest from "../services/login.service"
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, auth , ...rest}) =>
{  
    return (
        <Route {...rest} render={ props =>
            !auth.isLoggedIn ? (
                <Redirect to={{pathname:"/login", state: {from: props.location }}}/>
                ) : (
                <Component {...props} />
                )
        }/>
    );
}

const mapStateToProps = (state) => {
    return {
      auth: state.authState,
    };
  };

export default connect(mapStateToProps)(ProtectedRoute);