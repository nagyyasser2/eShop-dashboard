import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "../../types";
import { eshopApi } from "../../app/api/eshopApi";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ data: any }>) => {
      const { data } = action.payload;

      state.user = data.user;
      state.token = data.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", data.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(eshopApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(eshopApi.endpoints.login.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addMatcher(eshopApi.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      .addMatcher(eshopApi.endpoints.getUser.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        eshopApi.endpoints.getUser.matchFulfilled,
        (state, action: any) => {
          state.isLoading = false;
          state.user = action.payload.data;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(eshopApi.endpoints.getUser.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to get user";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      })
      .addMatcher(eshopApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      });
  },
});

export const {
  setCredentials,
  clearCredentials,
  setAuthLoading,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
