import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eshopApi } from "../features/api/eshopApi";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    [eshopApi.reducerPath]: eshopApi.reducer,
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eshopApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
