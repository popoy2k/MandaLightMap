import {
  LIPO_DATA_TABLE_ERROR,
  LIPO_DATA_TABLE_SUCCESS
} from "../actions/types";

const initialState = {
  lipoTable: [],
  healthTable: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIPO_DATA_TABLE_SUCCESS:
      return {
        ...state,
        lipoTable: action.payload.data
      };
    case LIPO_DATA_TABLE_ERROR:
      return {
        ...state,
        lipoTable: []
      };
    default:
      return state;
  }
};
