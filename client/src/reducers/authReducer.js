import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return state;
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
