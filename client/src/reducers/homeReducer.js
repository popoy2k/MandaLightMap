import {
  LIPO_DATA_TABLE_ERROR,
  LIPO_DATA_TABLE_SUCCESS,
  LIPO_DATA_SINGLE_REQUEST_SUCCESS,
  LIPO_DATA_SINGLE_REQUEST_ERROR,
  LIPO_DATA_DOWNLOAD_SUCCESS,
  LIPO_DATA_DOWNLOAD_ERROR,
  LIPO_DATA_UPLOAD_SUCCESS,
  LIPO_DATA_UPLOAD_ERROR
} from "../actions/types";

const initialState = {
  lipoTable: null,
  lipoSingleData: null,
  lipoDownloadUrl: null,
  lipoUpload: null,
  healthTable: null
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
        lipoTable: null
      };
    case LIPO_DATA_SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        lipoSingleData: action.payload.msg.data
      };
    case LIPO_DATA_SINGLE_REQUEST_ERROR:
      return {
        ...state,
        lipoSingleData: null
      };
    case LIPO_DATA_DOWNLOAD_SUCCESS:
      return {
        ...state,
        lipoDownloadUrl: action.payload
      };
    case LIPO_DATA_DOWNLOAD_ERROR:
      return {
        ...state,
        lipoDownloadUrl: null
      };

    case LIPO_DATA_UPLOAD_SUCCESS:
    case LIPO_DATA_UPLOAD_ERROR:
      return {
        ...state,
        lipoUpload: action.payload
      };
    default:
      return state;
  }
};
