import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  RESET_REQUEST
} from "./types";
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
      console.log(resData);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: resData
      });
    })
    .catch(errData => {
      console.log(errData.response);
      dispatch({
        type: SIGNUP_ERROR,
        paylaod: errData.response.data
      });
    });
};

export const signinUser = oldUser => (dispatch, getState) => {
  axios
    .post("/auth/signin", JSON.stringify(oldUser), getConfig(getState))
    .then(resData => {
      console.log(resData);
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: resData
      });
    })
    .catch(errData => {
      console.log(errData.response);
      dispatch({
        type: SIGNIN_ERROR,
        paylaod: errData.response.data
      });
    });
};

export const requestReset = email => (dispatch, getState) => {
  axios
    .post(
      "/auth/user/forget/request",
      JSON.stringify(email),
      getConfig(getState)
    )
    .then(res => {
      dispatch({
        type: RESET_REQUEST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: RESET_REQUEST,
        payload: err.response.data
      });
    });
};
