import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../features/api/authApi";
import { productsApi } from "../features/api/productsApi";
import { ordersApi } from "../features/api/ordersApi";
import { customersApi } from "../features/api/customersApi";
import { dashboardApi } from "../features/api/dashboardApi";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import { eshopApi } from "../features/api/eshopApi";
import { categoriesApi } from "../features/api/categoriesApi";

export const store = configureStore({
  reducer: {
    [eshopApi.reducerPath]: eshopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      eshopApi.middleware,
      authApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      customersApi.middleware,
      dashboardApi.middleware,
      categoriesApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
