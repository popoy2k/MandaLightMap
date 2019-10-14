import {
  LANDING_DATA_SUCCESS,
  LANDING_DATA_ERROR,
  LOAD_MAIN_MAP_DATA_SUCCESS,
  LOAD_MAIN_MAP_DATA_ERROR
} from "../actions/types";

const initialState = {
  landingData: {},
  mainMapData: JSON.parse(localStorage.getItem("mainMapData"))
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LANDING_DATA_SUCCESS:
      return {
        ...state,
        landingData: action.payload
      };
    case LOAD_MAIN_MAP_DATA_SUCCESS:
      localStorage.setItem("mainMapData", JSON.stringify(action.payload.data));
      return {
        ...state,
        mainMapData: action.payload.data
      };
    case LOAD_MAIN_MAP_DATA_ERROR:
      localStorage.removeItem("mainMapData");
      return {
        ...state,
        landingData: {}
      };
    case LANDING_DATA_ERROR:
      return {
        ...state,
        landingData: {}
      };
    default:
      return state;
  }
};
