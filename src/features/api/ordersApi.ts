import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order } from "../../types";

const API_BASE_URL = "https://localhost:7000/api/";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
