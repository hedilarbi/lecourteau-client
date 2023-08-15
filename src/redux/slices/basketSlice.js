import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      newBasket = state.items.splice(index, 1);
    },
    clearBasket: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketTotal = (state) => {
  const total = state.basket.items.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  return total.toFixed(2);
};

export const selectBasketItemsWithID = (itemId) =>
  createSelector(
    (state) => state.basket.items,
    (items) => items.filter((item) => item.id === itemId)
  );

export default basketSlice.reducer;
