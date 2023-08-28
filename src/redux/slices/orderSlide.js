import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrderTypeAndAddress: (state, action) => {
      return {
        ...state,
        address: action.payload.address,
        type: action.payload.type,
        coords: action.payload.coords,
      };
    },
  },
});

export const { setOrder, setOrderTypeAndAddress } = orderSlice.actions;

export const selectOrder = (state) => state.order;

export default orderSlice.reducer;
