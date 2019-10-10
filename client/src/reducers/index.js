import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import resetReducer from "./resetReducer";
import dataReducer from "./dataReducer";

export default combineReducers({
  auth: authReducer,
  reset: resetReducer,
  data: dataReducer
});
