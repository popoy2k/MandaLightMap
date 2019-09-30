import { RESET_REQUEST, RESET_PASS } from "../actions/types";

const initialState = {
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_REQUEST:
    case RESET_PASS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
