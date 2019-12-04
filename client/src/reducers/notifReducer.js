import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "../actions/types";

const initialState = {
  notif: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
      console.log(action.payload);
      return {
        notif: action.payload
      };
    default:
      return { ...state };
  }
};
