import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Product,
  Order,
  Customer,
  DashboardStats,
  User,
} from "../../types";

import { API_BASE_URL } from "../../utils/constants";

export const eshopApi = createApi({
  reducerPath: "eshopApi",
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
  tagTypes: ["Product", "Order", "Customer", "Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { data: { token: string; user: any } },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "Auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<
      User,
      {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        dateOfBirth: string;
      }
    >({
      query: (userData) => ({
        url: "Auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => "auth/profile",
      providesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // Dashboard endpoints
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => "dashboard/stats",
      providesTags: ["Product", "Order", "Customer"],
    }),

    // Product endpoints
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              "Product",
            ]
          : ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // Order endpoints
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: ["Order"],
    }),

    // Customer endpoints
    getCustomers: builder.query<Customer[], void>({
      query: () => "customers",
      providesTags: ["Customer"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
  useGetDashboardStatsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useGetOrdersQuery,
  useGetCustomersQuery,
} = eshopApi;
