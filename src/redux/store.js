import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlide";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
    order: orderReducer,
  },
});
