import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";
import type {
  ApiResponse,
  ApplicationUser,
  AuthResponse,
} from "../../types/auth.types";

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
    // LOGIN
    login: builder.mutation<AuthResponse, { Email: string; Password: string }>({
      query: (credentials) => ({
        url: "Auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // REGISTER
    register: builder.mutation<
      AuthResponse,
      {
        FirstName: string;
        LastName: string;
        Email: string;
        Password: string;
        ConfirmPassword: string;
        DateOfBirth: string;
      }
    >({
      query: (userData) => ({
        url: "Auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // GET USER PROFILE
    getUser: builder.query<ApplicationUser, void>({
      query: () => "Auth/profile",
      // ✅ Transform the API response to extract just the Data
      transformResponse: (response: ApiResponse<ApplicationUser>) =>
        response.Data,
      providesTags: ["Auth"],
    }),

    // LOGOUT
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "Auth/logout",
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
