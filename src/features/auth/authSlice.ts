import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../app/api/authApi";
import type { ApplicationUser, AuthResponse } from "../../types/auth.types";

interface AuthState {
  User: ApplicationUser | null;
  Token: string | null;
  RefreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  User: null,
  Token: localStorage.getItem("token") || null,
  RefreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const payload = action.payload.Data;

      state.User = payload.User;
      state.Token = payload.Token;
      state.RefreshToken = payload.RefreshToken;
      state.isAuthenticated = true;

      localStorage.setItem("token", payload.Token);
      localStorage.setItem("refreshToken", payload.RefreshToken);
    },
    clearCredentials: (state) => {
      state.User = null;
      state.Token = null;
      state.RefreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
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
      // 🔑 LOGIN
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        state.User = action.payload.Data.User;
        state.Token = action.payload.Data.Token;
        state.RefreshToken = action.payload.Data.RefreshToken;

        localStorage.setItem("token", action.payload.Data.Token);
        localStorage.setItem("refreshToken", action.payload.Data.RefreshToken);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })

      // 🔑 GET USER
      .addMatcher(authApi.endpoints.getUser.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.User = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to get user";

        // ✅ If 401 Unauthorized, token is likely expired - clear everything
        const errorStatus =
          (action.payload as any)?.status ||
          (action.meta?.baseQueryMeta as { response?: { status?: number } })
            ?.response?.status;

        if (errorStatus === 401) {
          state.User = null;
          state.Token = null;
          state.RefreshToken = null;
          state.isAuthenticated = false;

          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        }
      })

      // 🔑 LOGOUT
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.User = null;
        state.Token = null;
        state.RefreshToken = null;
        state.isAuthenticated = false;

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
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
