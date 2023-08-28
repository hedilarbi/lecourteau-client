import { createSelector, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
const initialState = {
  items: [],
  offers: [],
  rewards: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, { ...action.payload, uid: uuid.v4() }];
    },
    deleteFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.ui === action.payload.ui
      );
      let newBasket = [...state.items];
      newBasket = state.items.splice(index, 1);
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.uid === action.payload.uid
      );
      let newBasket = [...state.items];
      newBasket = state.items.splice(index, 1);
    },
    addOfferToBasket: (state, action) => {
      state.offers = [...state.offers, action.payload];
    },
    removeOfferFromBasket: (state, action) => {
      const index = state.offers.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.offers];
      newBasket = state.offers.splice(index, 1);
    },
    addRewardToBasket: (state, action) => {
      state.rewards = [...state.rewards, action.payload];
    },
    removeRewardFromBasket: (state, action) => {
      const index = state.rewards.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.offers];
      newBasket = state.rewards.splice(index, 1);
    },

    updateItemInBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.uid === action.payload.uid
      );
      state.items[index].customization = action.payload.customization;
      state.items[index].price = action.payload.price;
    },
    updateOfferInBasket: (state, action) => {
      const index = state.offers.findIndex(
        (item) => item.id === action.payload.id
      );
      state.offers[index].customizations = action.payload.customizations;
    },

    clearBasket: (state, action) => {
      state.items = [];
      state.offers = [];
      state.rewards = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  clearBasket,
  addOfferToBasket,
  removeOfferFromBasket,
  addRewardToBasket,
  removeRewardFromBasket,
  updateItemInBasket,
  updateOfferInBasket,
  deleteFromBasket,
} = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketOffers = (state) => state.basket.offers;
export const selectBasket = (state) => state.basket;
export const selectBasketTotal = (state) => {
  const total = state.basket.items.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);
  const offersTotal = state.basket.offers.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);
  const totalPrice = offersTotal + total;
  return totalPrice.toFixed(2);
};
export const selectBasketItemWithUID = (uid) =>
  createSelector(
    (state) => state.basket.items,
    (items) => items.filter((item) => item.uid === uid)
  );
export const selectBasketItemsWithID = (itemId) =>
  createSelector(
    (state) => state.basket.items,
    (items) => items.filter((item) => item.id === itemId)
  );

export default basketSlice.reducer;
