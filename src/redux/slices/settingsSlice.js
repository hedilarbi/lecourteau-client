import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export const selectSettings = (state) => state.settings.settings;

export default settingsSlice.reducer;
