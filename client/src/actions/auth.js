import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "./types";
import axios from "axios";

export const getConfig = getState => {
  const config = {
    headers: { "Content-type": "application/json" }
  };
  const token = getState().auth.token;
  if (token) {
    config.headers["x-auth-token"] = `Bearer ${token}`;
  }

  return config;
};

export const signupUser = newUser => (dispatch, getState) => {
  axios
    .post("/auth/signup", JSON.stringify(newUser), getConfig(getState))
    .then(resData => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: resData
      });
    })
    .catch(errData => {
      dispatch({
        type: SIGNUP_ERROR,
        paylaod: errData
      });
    });
};
