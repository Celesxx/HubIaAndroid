import axios from "axios";
import { AuthActionType } from "../actions/auth.action";
import { Redirect } from 'react-router-dom';

const authState = 
{
  isLoggedIn: false,
  user: 
  {
    email: "",
    jwttoken: "",
    authorities: [],
  },
};


const getAuthState = () => 
{
  const auth = localStorage.getItem("auth");
  try 
  {
    const authobj = JSON.parse(auth);
    const { expires_at, jwttoken } = authobj.user;
    if (new Date(expires_at) > new Date()) 
    {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwttoken}`;
      return authobj;
    }
    return authState;
  } catch (error) {
    return authState;
  }
};


const newAuth = getAuthState();

const authreducer = (state = newAuth, action) => 
{
  switch (action.type) 
  {
    
    case AuthActionType.LOGIN_SUCCESS:
      const loginAuthState = 
      {
        isLoggedIn: true,
        user: action.payload,
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.jwttoken}`;
      return loginAuthState;

    default:
      return state;
  }
};

export default authreducer;