import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {},
  restaurants: [],
  restaurant: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload.settings[0];
      state.restaurants = action.payload.restaurants;
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setSettings, setRestaurant } = settingsSlice.actions;
export const selectRestaurant = (state) => state.settings.restaurant;
export const selectSettings = (state) => state.settings.settings;
export const selectRestaurants = (state) => state.settings.restaurants;

export default settingsSlice.reducer;
