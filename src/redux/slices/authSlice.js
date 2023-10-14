import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data = { ...action.payload };
    },
    clearAuthData: (state, action) => {
      state.data = {};
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export const selectAuthData = (state) => state.auth.data;

export default authSlice.reducer;
