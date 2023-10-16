import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware())
);