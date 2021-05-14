import * as loginRequest from "../../services/login.service"
const AuthActionType = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
};

const LoginAuthAction = (loginState, history, setErrorHandler) => 
{
  return async (dispatch) => 
  {
    try 
    {
        const res = await loginRequest.postLogin(loginState)
        dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: res });
        history.push("/");
    } catch (error) 
    {
      if (error.response) 
      {
        dispatch({
          type: AuthActionType.LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
      setErrorHandler({ hasError: true, message: error.response });
    }
  };
};

export {
  AuthActionType,
  LoginAuthAction,
};