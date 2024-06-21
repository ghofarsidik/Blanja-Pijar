import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";

export const getActiveUser = createAsyncThunk(
  "user/getActiveUser",
  async (_, thunkApi) => {
    try {
      const res = await API.get(`/user`, {
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
    tokenPayment: [],
  },
  reducers: {
    setTokenPayment: (state, action) => {
      state.tokenPayment = action.payload;
    },
  },
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
export const { setTokenPayment } = userSlice.actions;
export default userSlice.reducer;
