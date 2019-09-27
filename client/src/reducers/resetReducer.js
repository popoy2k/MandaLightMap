import { RESET_REQUEST } from "../actions/types";

const initialState = {
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
