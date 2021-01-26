import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";

export default combineReducers({
  auth: reducerAuth
});
