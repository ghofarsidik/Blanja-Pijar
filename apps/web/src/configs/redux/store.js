import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../configs/redux/action/authSlice";
import authRegistReducer from "./action/authRegist";
import userSlice from "./features/userSlice";
import paymentSlice from "./features/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    auth: authRegistReducer,
    user: userSlice,
    payment: paymentSlice,
  },
});

export default store;
