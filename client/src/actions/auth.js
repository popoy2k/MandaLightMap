import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  RESET_REQUEST,
  RESET_PASS,
  LANDING_DATA_SUCCESS,
  LANDING_DATA_ERROR,
  LOAD_MAIN_MAP_ERROR,
  LOAD_MAIN_MAP_SUCCESS,
  LOAD_MAIN_MAP_DATA_SUCCESS,
  LOAD_MAIN_MAP_DATA_ERROR
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
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: resData
      });
    })
    .catch(errData => {
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
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: resData
      });
    })
    .catch(errData => {
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

export const resetPassFinal = newPass => (dispatch, getState) => {
  axios
    .post("/auth/user/reset", JSON.stringify(newPass), getConfig(getState))
    .then(resData => {
      dispatch({
        type: RESET_PASS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: RESET_PASS,
        payload: resErr.response.data
      });
    });
};

export const getLanding = () => (dispatch, getState) => {
  axios
    .get("/data/landing", null, getConfig(getState))
    .then(resData => {
      dispatch({
        type: LANDING_DATA_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: LANDING_DATA_ERROR,
        payload: resErr.response.data
      });
    });
};

export const getMainMap = () => (dispatch, getState) => {
  axios
    .get("/map/main", null, getConfig(getState))
    .then(resData => {
      dispatch({ type: LOAD_MAIN_MAP_SUCCESS, payload: resData.data });
    })
    .catch(resErr => {
      dispatch({ type: LOAD_MAIN_MAP_ERROR, payload: resErr.response.data });
    });
};

export const getMapData = mapObj => (dispatch, getState) => {
  if (Array.isArray(mapObj.mapObj)) {
    mapObj = { mapObj: mapObj.mapObj.join(",") };
  }

  axios
    .post("/data/custom", JSON.stringify(mapObj), getConfig(getState))
    .then(resData => {
      dispatch({
        type: LOAD_MAIN_MAP_DATA_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: LOAD_MAIN_MAP_DATA_ERROR,
        payload: resErr.response.data
      });
    });
};
