import { LOAD_MAIN_MAP_SUCCESS, LOAD_MAIN_MAP_ERROR } from "../actions/types";

const initialState = {
  mainMap: JSON.parse(localStorage.getItem("mainMap")) || null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MAIN_MAP_SUCCESS:
      localStorage.setItem("mainMap", JSON.stringify(action.payload.data));
      return {
        ...state,
        mainMap: action.payload.data
      };
    case LOAD_MAIN_MAP_ERROR:
      localStorage.removeItem("mainMap");
      return {
        ...state,
        mainMap: null
      };
    default:
      return state;
  }
};
