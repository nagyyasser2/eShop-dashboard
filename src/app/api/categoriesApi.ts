import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";
import type {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../../types/categories.types";

const createCategoryFormData = (
  category: UpdateCategoryDto | CreateCategoryDto
): FormData => {
  const formData = new FormData();

  formData.append("Name", category.Name);
  if (category.Description) {
    formData.append("Description", category.Description);
  }
  formData.append("IsActive", category?.IsActive ? "true" : "false");
  formData.append("SortOrder", category?.SortOrder?.toString() ?? "0");

  if (category?.ImageFiles && category?.ImageFiles.length > 0) {
    category.ImageFiles.forEach((file) => {
      formData.append("ImageFiles", file);
    });
  }

  if ("imageUrlsToRemove" in category && category.imageUrlsToRemove) {
    category.imageUrlsToRemove.forEach((url) => {
      formData.append("imageUrlsToRemove", url);
    });
  }

  return formData;
};

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // Get paginated categories
    getCategories: builder.query<CategoryDto[], void>({
      query: () => ({
        url: "categories",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ Id }) => ({
                type: "Category" as const,
                id: Id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    // categoriesApi.ts
    getCategory: builder.query<
      CategoryDto,
      { id: number; includeSubCategories?: boolean }
    >({
      query: ({ id, includeSubCategories = false }) => ({
        url: `categories/${id}`,
        params: { includeSubCategories },
      }),
      providesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "PARENT_CATEGORY" }, // Add parent tag
      ],
    }),
    createCategory: builder.mutation<CategoryDto, CreateCategoryDto>({
      query: (categoryDto) => ({
        url: "categories",
        method: "POST",
        body: createCategoryFormData(categoryDto),
      }),
      invalidatesTags: (result, error, categoryDto) => {
        const invalidations = [
          { type: "Category" as const, id: "LIST" },
          { type: "Category" as const, id: "ACTIVE" },
        ];

        return invalidations;
      },
    }),
    updateCategory: builder.mutation<
      void,
      { id: number; categoryDto: UpdateCategoryDto }
    >({
      query: ({ id, categoryDto }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: createCategoryFormData(categoryDto),
      }),
      invalidatesTags: (result, error, { id, categoryDto }) => [
        { type: "Category" as const, id },
        { type: "Category" as const, id: "LIST" },
        { type: "Category" as const, id: "ACTIVE" },
      ],
    }),
    deleteCategory: builder.mutation<
      { id: number; parentCategoryId?: number },
      number
    >({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category" as const, id },
        { type: "Category" as const, id: "LIST" },
        { type: "Category" as const, id: "ACTIVE" },
      ],
    }),
    toggleCategoryStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `categories/${id}/toggle-status`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
        { type: "Category", id: "ACTIVE" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useToggleCategoryStatusMutation,
} = categoriesApi;

// Export utility functions
export { createCategoryFormData };
