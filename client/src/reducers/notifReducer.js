import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_ERROR,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_ERROR
} from "../actions/types";

const initialState = {
  notif: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
    case SIGNIN_ERROR:
    case CHANGE_ROLE_ERROR:
    case CHANGE_ROLE_SUCCESS:
      return {
        notif: action.payload
      };
    default:
      return { ...state };
  }
};
