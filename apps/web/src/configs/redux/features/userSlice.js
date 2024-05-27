import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getActiveUser = createAsyncThunk(
  "user/getActiveUser",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:3000/v1/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    activeUser: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActiveUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.activeUser = data;
        state.error = "";
      })
      .addCase(getActiveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});
export default userSlice.reducer;
