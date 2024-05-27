import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../configs/redux/action/authSlice';
import authRegistReducer from './action/authRegist';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    auth: authRegistReducer,
  },
});


export default store