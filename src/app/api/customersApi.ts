import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Customer } from "../../types";

const API_BASE_URL = "https://localhost:7000/api/";

export const customersApi = createApi({
  reducerPath: "customersApi",
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
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => "customers",
      providesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery } = customersApi;
