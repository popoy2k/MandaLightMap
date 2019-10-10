import { LANDING_DATA_SUCCESS, LANDING_DATA_ERROR } from "../actions/types";

const initialState = {
  landingData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LANDING_DATA_SUCCESS:
      return {
        ...state,
        landingData: action.payload
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
