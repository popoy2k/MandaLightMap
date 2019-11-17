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
  LOAD_MAIN_MAP_DATA_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_ERROR,
  LIPO_DATA_TABLE_ERROR,
  LIPO_DATA_TABLE_SUCCESS,
  LIPO_DATA_SINGLE_REQUEST_SUCCESS,
  LIPO_DATA_SINGLE_REQUEST_ERROR,
  LIPO_DATA_DOWNLOAD_SUCCESS,
  LIPO_DATA_DOWNLOAD_ERROR,
  LIPO_DATA_UPLOAD_SUCCESS,
  LIPO_DATA_UPLOAD_ERROR,
  USER_DATA_TABLE_SUCCESS,
  USER_DATA_TABLE_ERROR,
  DOWNLOAD_DATA_TABLE_SUCCESS,
  DOWNLOAD_DATA_TABLE_ERROR,
  SIGN_OUT,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_ERROR
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

export const googleSignIn = clientObj => (dispatch, getState) => {
  axios
    .post("/auth/google/signin", JSON.stringify(clientObj), getConfig(getState))
    .then(resData => {
      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
        payload: resData.data.msg
      });
    })
    .catch(errData => {
      dispatch({
        type: GOOGLE_LOGIN_ERROR
      });
    });
};

export const verifyToken = () => (dispatch, getState) => {
  axios
    .post("/auth/verify/token", null, getConfig(getState))
    .then(resData => {
      dispatch({
        type: VERIFY_TOKEN_SUCCESS,
        payload: resData.data
      });
    })
    .catch(errData => {
      dispatch({
        type: VERIFY_TOKEN_ERROR
      });
    });
};

export const getTableData = () => (dispatch, getState) => {
  axios
    .post("/data/lipo/table", null, getConfig(getState))
    .then(resData => {
      dispatch({
        type: LIPO_DATA_TABLE_SUCCESS,
        payload: resData.data.msg
      });
    })
    .catch(errRes => {
      dispatch({ type: LIPO_DATA_TABLE_ERROR });
    });
};

export const getSingleLipoData = dataObj => (dispatch, getState) => {
  axios
    .post("/data/lipo/single", JSON.stringify(dataObj), getConfig(getState))
    .then(resData => {
      dispatch({
        type: LIPO_DATA_SINGLE_REQUEST_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: LIPO_DATA_SINGLE_REQUEST_ERROR
      });
    });
};

export const requestDownloadURL = fileObj => (dispatch, getState) => {
  axios
    .post(
      "/data/lipo/download",
      JSON.stringify({ fileRequest: fileObj.selectedData, type: fileObj.type }),
      getConfig(getState)
    )
    .then(resData => {
      dispatch({
        type: LIPO_DATA_DOWNLOAD_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: LIPO_DATA_DOWNLOAD_ERROR
      });
    });
};

export const uploadValidate = file => (dispatch, getState) => {
  axios
    .post("/data/lipo/upload", file, getConfig(getState))
    .then(resData => {
      dispatch({
        type: LIPO_DATA_UPLOAD_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: LIPO_DATA_UPLOAD_ERROR,
        payload: resErr.response.data
      });
    });
};

export const getUserTableData = () => (dispatch, getState) => {
  axios
    .post("/data/user/table", null, getConfig(getState))
    .then(resData => {
      dispatch({
        type: USER_DATA_TABLE_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      console.log(resErr.response);
      dispatch({
        type: USER_DATA_TABLE_ERROR
      });
    });
};

export const getDownloadTableData = () => (dispatch, getState) => {
  axios
    .post("/data/download/table", null, getConfig(getState))
    .then(resData => {
      dispatch({
        type: DOWNLOAD_DATA_TABLE_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: DOWNLOAD_DATA_TABLE_ERROR
      });
    });
};

export const getUserDetails = id => (dispatch, getState) => {
  axios
    .post("/data/user/detail", JSON.stringify(id), getConfig(getState))
    .then(resData => {
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: resData.data
      });
    })
    .catch(resErr => {
      dispatch({
        type: USER_DETAILS_ERROR
      });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: SIGN_OUT });
};
