import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  address: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserAddress: (state, action) => {
      return {
        ...state,
        address: action.payload,
      };
    },
  },
});

export const { setUser, setUserAddress } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserAddress = (state) => state.user.address;

export default userSlice.reducer;
