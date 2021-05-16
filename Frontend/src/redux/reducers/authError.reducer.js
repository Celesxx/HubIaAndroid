const { AuthActionType } = require("../actions/auth.action");

const authError = {
  message: "",
};

const authErrorReducer = (state = authError, action) => 
{
  switch (action.type) 
  {
    case AuthActionType.LOGIN_FAIL:
      return { message: action.payload };
    default:
      return state;
  }
};

export default authErrorReducer;