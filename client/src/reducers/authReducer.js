import {
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_ERROR,
  REQUEST_ERROR,
  SIGN_OUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
    case VERIFY_TOKEN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      };
    case GOOGLE_LOGIN_ERROR:
    case VERIFY_TOKEN_ERROR:
    case SIGNUP_ERROR:
    case SIGNIN_ERROR:
    case REQUEST_ERROR:
    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      };
    default:
      return state;
  }
};
