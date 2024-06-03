//src/configs/redux/action/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser', async (values, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3000/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    const user = data.data;

    localStorage.setItem('token', user.Token);
    localStorage.setItem('refreshToken', user.RefreshToken);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch("http://localhost:3000/v1/auth/user", {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    const userData = await response.json();
    return userData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
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
