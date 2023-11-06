import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  loginReducer,
  userReducer
});

export default rootReducer;