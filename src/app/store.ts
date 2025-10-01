import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { productsApi } from "./api/productsApi";
import { ordersApi } from "./api/ordersApi";
import { usersApi } from "./api/usersApi";
import { dashboardApi } from "./api/dashboardApi";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import { eshopApi } from "./api/eshopApi";
import { categoriesApi } from "./api/categoriesApi";
import { bannersApi } from "./api/bannersApi";

export const store = configureStore({
  reducer: {
    [eshopApi.reducerPath]: eshopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [bannersApi.reducerPath]: bannersApi.reducer,
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      eshopApi.middleware,
      authApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      usersApi.middleware,
      dashboardApi.middleware,
      categoriesApi.middleware,
      bannersApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
