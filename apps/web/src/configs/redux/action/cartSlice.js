// src/configs/redux/action/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk('cart/addToCart', async (item, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:3000/v1/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCartByUserID = createAsyncThunk('cart/getCartByUserID', async (_, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:3000/v1/cart', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => { state.loading = true; })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartByUserID.pending, (state) => { state.loading = true; })
      .addCase(getCartByUserID.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCartByUserID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default cartSlice.reducer;
