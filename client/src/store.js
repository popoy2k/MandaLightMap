import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/";

const initialState = {};

const middleware = [thunk];

var composeFunc;

composeFunc = compose(applyMiddleware(...middleware));

if (
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  composeFunc = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
const store = createStore(rootReducer, initialState, composeFunc);

export default store;
