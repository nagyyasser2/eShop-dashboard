import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateVariantDto,
  UpdateProductDto,
  VariantDto,
} from "../../types/variants";

const API_BASE_URL = "https://localhost:7000/api/";

export interface CreateProductDto {
  id?: number;
  name: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stockQuantity: number;
  trackQuantity?: boolean;
  isActive?: boolean;
  isFeatured?: boolean;
  weight?: number;
  dimensions?: string;
  tags?: string;
  categoryId?: number;
  images?: File[];
  variants?: CreateVariantDto[];
}

export interface UpdateStockDto {
  quantity: number;
}

export interface ImageDto {
  id: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: string;
  productId: number;
}

export interface CategoryDto {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  ParentCategoryId: number;
  ParentCategoryName: string;
  ChildCategories: CategoryDto[];
  ProductCount: number;
}

export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stockQuantity: number;
  trackQuantity: boolean;
  isActive: boolean;
  isFeatured: boolean;
  weight: number;
  dimensions?: string;
  tags?: string;
  createdAt: string;
  categoryId?: number;
  category?: CategoryDto;
  images: ImageDto[];
  variants: VariantDto[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
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
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<ProductDto, CreateProductDto>({
      query: (product) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(product)) {
          if (key === "images" && value) {
            (value as File[]).forEach((file, index) => {
              formData.append(`Images[${index}]`, file);
            });
          } else if (key === "variants" && value) {
            formData.append("Variants", JSON.stringify(value));
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        }
        return {
          url: "products",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query<
      { data: ProductDto[]; count: number },
      { featured?: boolean; active?: boolean; categoryId?: number }
    >({
      query: ({ featured, active, categoryId }) => {
        const params = new URLSearchParams();
        if (featured !== undefined)
          params.append("featured", featured.toString());
        if (active !== undefined) params.append("active", active.toString());
        if (categoryId !== undefined)
          params.append("categoryId", categoryId.toString());
        return {
          url: `products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query<ProductDto, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    updateProduct: builder.mutation<ProductDto, UpdateProductDto>({
      query: (product) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(product)) {
          if (key === "newImages" && value) {
            (value as File[]).forEach((file, index) => {
              formData.append(`NewImages[${index}]`, file);
            });
          } else if (key === "imageIdsToDelete" && value) {
            (value as number[]).forEach((id, index) => {
              formData.append(`ImageIdsToDelete[${index}]`, id.toString());
            });
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        }
        return {
          url: `products/${product.id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    toggleProductStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    toggleProductFeatured: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}/toggle-featured`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    updateStock: builder.mutation<void, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `products/${id}/stock`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useToggleProductStatusMutation,
  useToggleProductFeaturedMutation,
  useUpdateStockMutation,
} = productsApi;
