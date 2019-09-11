// import {
//   LOGIN_ERROR,
//   LOGIN_SUCCESS,
//   USER_LOADING,
//   USER_LOADED
// } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
