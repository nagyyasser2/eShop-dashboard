import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateVariantDto, UpdateProductDto, Variant } from "../../types";

import { API_BASE_URL } from "../../utils/constants";

export const variantsApi = createApi({
  reducerPath: "variantsApi",
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
  tagTypes: ["Variant"],
  endpoints: (builder) => ({
    getVariantById: builder.query<Variant, number>({
      query: (id) => `variants/${id}`,
      providesTags: (result, error, id) => [{ type: "Variant", id }],
    }),
    getVariantsByProductId: builder.query<Variant[], number>({
      query: (productId) => `variants/product/${productId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Variant" as const, id })),
              { type: "Variant", id: "LIST" },
            ]
          : [{ type: "Variant", id: "LIST" }],
    }),
    createVariant: builder.mutation<Variant, CreateVariantDto>({
      query: (variantDto) => ({
        url: "variants",
        method: "POST",
        body: variantDto,
      }),
      invalidatesTags: [{ type: "Variant", id: "LIST" }],
    }),
    updateVariant: builder.mutation<Variant, UpdateProductDto>({
      query: (variantDto) => ({
        url: "variants",
        method: "PUT",
        body: variantDto,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Variant", id },
        { type: "Variant", id: "LIST" },
      ],
    }),
    deleteVariant: builder.mutation<void, number>({
      query: (id) => ({
        url: `variants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Variant", id },
        { type: "Variant", id: "LIST" },
      ],
    }),
    toggleVariantStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `variants/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Variant", id },
        { type: "Variant", id: "LIST" },
      ],
    }),
    updateStockQuantity: builder.mutation<
      void,
      { id: number; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `variants/${id}/stock`,
        method: "PATCH",
        body: quantity,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Variant", id },
        { type: "Variant", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetVariantByIdQuery,
  useGetVariantsByProductIdQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useToggleVariantStatusMutation,
  useUpdateStockQuantityMutation,
} = variantsApi;
