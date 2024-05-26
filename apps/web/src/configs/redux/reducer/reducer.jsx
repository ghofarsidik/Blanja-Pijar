import { combineReducers } from "redux";
import authReducer from "./auth.Reducer";
import keepLoginReducer from "./keepLogin.Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  keepLogin: keepLoginReducer,
});

export default rootReducer;
