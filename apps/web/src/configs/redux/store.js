import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../configs/redux/action/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});


export default store