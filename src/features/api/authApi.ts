import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types";

const API_BASE_URL = "https://localhost:7000/api/";

export const authApi = createApi({
  reducerPath: "authApi",
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
  tagTypes: ["Auth"],
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi;
