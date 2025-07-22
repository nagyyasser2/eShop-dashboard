import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Configurable API base URL (consider using environment variables in production)
export const API_BASE_URL = "https://localhost:7000/api/";

// Type definitions for DTOs
export interface CategoryDto {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
  childCategories: CategoryDto[];
  productCount: number;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  parentCategoryId?: number;
  imageFiles?: File[];
}

export interface UpdateCategoryDto {
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  parentCategoryId?: number;
  imageFiles?: File[];
  imageUrlsToRemove?: string[];
}

export interface CategorySummaryDto {
  id: number;
  name: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
  isActive: boolean;
  productCount: number;
}

export interface CategoryTreeDto {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
  children: CategoryTreeDto[];
}

// Helper function to create FormData from category DTO
const createCategoryFormData = (
  category: CreateCategoryDto | UpdateCategoryDto
): FormData => {
  const formData = new FormData();

  formData.append("name", category.name);
  if (category.description) {
    formData.append("description", category.description);
  }
  formData.append("isActive", category.isActive.toString());
  formData.append("sortOrder", category.sortOrder.toString());

  if (category.parentCategoryId) {
    formData.append("parentCategoryId", category.parentCategoryId.toString());
  }

  // Append new image files
  if (category.imageFiles && category.imageFiles.length > 0) {
    category.imageFiles.forEach((file) => {
      formData.append("imageFiles", file); // No array indexing
    });
  }

  // Append URLs to remove (for update only)
  if ("imageUrlsToRemove" in category && category.imageUrlsToRemove) {
    category.imageUrlsToRemove.forEach((url) => {
      formData.append("imageUrlsToRemove", url); // No array indexing
    });
  }

  return formData;
};

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Note: Consider handling missing/invalid token scenarios (e.g., redirect to login)
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
    getCategories: builder.query<
      CategoryDto[],
      { includeSubCategories?: boolean; page?: number; pageSize?: number }
    >({
      query: ({ includeSubCategories = false, page = 1, pageSize = 10 }) => ({
        url: "categories",
        params: { includeSubCategories, page, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category" as const, id })),
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

    // Get category summary (lightweight)
    getCategoriesSummary: builder.query<CategorySummaryDto[], void>({
      query: () => ({
        url: "categories/summary",
      }),
      providesTags: [{ type: "Category", id: "SUMMARY" }],
    }),

    // Get hierarchical category tree
    getCategoriesTree: builder.query<CategoryTreeDto[], void>({
      query: () => ({
        url: "categories/tree",
      }),
      providesTags: [{ type: "Category", id: "TREE" }],
    }),

    // Get active categories only
    getActiveCategories: builder.query<
      CategoryDto[],
      { includeSubCategories?: boolean }
    >({
      query: ({ includeSubCategories = false }) => ({
        url: "categories/active",
        params: { includeSubCategories },
      }),
      providesTags: [{ type: "Category", id: "ACTIVE" }],
    }),

    // Get category children
    getCategoryChildren: builder.query<CategoryDto[], number>({
      query: (id) => ({
        url: `categories/${id}/children`,
      }),
      providesTags: (result, error, id) => [
        { type: "Category", id: `CHILDREN_${id}` },
      ],
    }),

    // Create new category
    createCategory: builder.mutation<CategoryDto, CreateCategoryDto>({
      query: (categoryDto) => ({
        url: "categories",
        method: "POST",
        body: createCategoryFormData(categoryDto),
      }),
      invalidatesTags: (result, error, categoryDto) => {
        const invalidations = [
          { type: "Category" as const, id: "LIST" },
          { type: "Category" as const, id: "SUMMARY" },
          { type: "Category" as const, id: "TREE" },
          { type: "Category" as const, id: "ACTIVE" },
          // Always invalidate the parent category if it exists
          ...(categoryDto.parentCategoryId
            ? [
                { type: "Category" as const, id: categoryDto.parentCategoryId },
                {
                  type: "Category" as const,
                  id: `CHILDREN_${categoryDto.parentCategoryId}`,
                },
                { type: "Category" as const, id: "PARENT_CATEGORY" },
              ]
            : []),
          // For root categories, invalidate the root list
          ...(!categoryDto.parentCategoryId
            ? [{ type: "Category" as const, id: "ROOT" }]
            : []),
        ];

        return invalidations;
      },
    }),

    // Update existing category
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
        { type: "Category" as const, id: "SUMMARY" },
        { type: "Category" as const, id: "TREE" },
        { type: "Category" as const, id: "ACTIVE" },
        { type: "Category" as const, id: `CHILDREN_${id}` },
        ...(categoryDto.parentCategoryId
          ? [
              { type: "Category" as const, id: categoryDto.parentCategoryId },
              {
                type: "Category" as const,
                id: `CHILDREN_${categoryDto.parentCategoryId}`,
              },
              { type: "Category" as const, id: "PARENT_CATEGORY" },
            ]
          : []),
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
        { type: "Category" as const, id: "SUMMARY" },
        { type: "Category" as const, id: "TREE" },
        { type: "Category" as const, id: "ACTIVE" },
        { type: "Category" as const, id: `CHILDREN_${id}` },
        ...(result?.parentCategoryId !== undefined
          ? [
              { type: "Category" as const, id: result.parentCategoryId },
              {
                type: "Category" as const,
                id: `CHILDREN_${result.parentCategoryId}`,
              },
            ]
          : []),
        { type: "Category", id: "PARENT_CATEGORY" },
      ],
    }),
    // Toggle category active status
    toggleCategoryStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `categories/${id}/toggle-status`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
        { type: "Category", id: "SUMMARY" },
        { type: "Category", id: "TREE" },
        { type: "Category", id: "ACTIVE" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoriesSummaryQuery,
  useGetCategoriesTreeQuery,
  useGetActiveCategoriesQuery,
  useGetCategoryChildrenQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useToggleCategoryStatusMutation,
} = categoriesApi;

// Export utility functions
export { createCategoryFormData };
