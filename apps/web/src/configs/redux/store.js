import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../configs/redux/action/authSlice";
import authRegistReducer from "./action/authRegist";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    auth: authRegistReducer,
    user: userSlice,
  },
});

export default store;
