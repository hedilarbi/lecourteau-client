import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  address: {},
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setUserAddress: (state, action) => {
      return {
        ...state,
        address: action.payload,
      };
    },
    setUserToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    clearUser: (state) => {
      state.user = {};
      state.address = {};
      state.token = null;
    },
    removeFromFidelityPoints: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          fidelity_points: state.user.fidelity_points - action.payload,
        },
      };
    },
    addToFidelityPoints: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          fidelity_points: state.user.fidelity_points + action.payload,
        },
      };
    },
  },
});

export const {
  setUser,
  setUserAddress,
  setUserToken,
  removeFromFidelityPoints,
  clearUser,
  addToFidelityPoints,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserAddress = (state) => state.user.address;
export const selectUserToken = (state) => state.user.token;

export default userSlice.reducer;
