// src/configs/redux/action/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://blanja-kelompok-1-production.up.railway.app/v1";

export const loginUser = createAsyncThunk('auth/loginUser', async (values, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, values, {
      headers: { "Content-Type": "application/json" }
    });
    const user = response.data.data;

    localStorage.setItem('token', user.Token);
    localStorage.setItem('refreshToken', user.RefreshToken);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null, isAuthenticated: false },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => { state.loading = true; })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;
