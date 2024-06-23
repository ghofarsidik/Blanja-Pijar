import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    value: null,
  },
  reducers: {
    setCheckout: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
