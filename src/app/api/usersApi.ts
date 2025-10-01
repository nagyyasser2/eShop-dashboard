import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";

// Types
export interface UserDto {
  id: string;
  firstName: string;
  email: string;
  emailConfirmed: boolean;
  roles: string[];
}

export interface GetUsersResponse {
  users: UserDto[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
}

export interface AssignRolesRequest {
  roles: string[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // GET: api/users
    getUsers: builder.query<GetUsersResponse, GetUsersParams | void>({
      query: (params) => ({
        url: "/users",
        params: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // GET: api/users/{id}
    getUser: builder.query<UserDto, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // DELETE: api/users/{id}
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    // POST: api/users/{id}/roles
    assignRoles: builder.mutation<
      { message: string },
      { id: string; roles: string[] }
    >({
      query: ({ id, roles }) => ({
        url: `/users/${id}/roles`,
        method: "POST",
        body: { roles },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // DELETE: api/users/{id}/roles/{roleName}
    removeRole: builder.mutation<
      { message: string },
      { id: string; roleName: string }
    >({
      query: ({ id, roleName }) => ({
        url: `/users/${id}/roles/${roleName}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useAssignRolesMutation,
  useRemoveRoleMutation,
} = usersApi;
