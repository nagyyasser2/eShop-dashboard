import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateProductDto,
  UpdateProductDto,
  ProductDto,
  UpdateVariantDto,
} from "../../types/index";
import { API_BASE_URL } from "../../utils/constants";

// Helper function to create FormData for product DTOs
const createProductFormData = (
  product: CreateProductDto | UpdateProductDto | any
): FormData => {
  const formData = new FormData();

  // Common fields for both CreateProductDto and UpdateProductDto
  formData.append("Id", product.id.toString());
  formData.append("Name", product.name);
  formData.append("SKU", product.sku);
  formData.append("Price", product.price.toString());
  formData.append("StockQuantity", product.stockQuantity.toString());
  formData.append("TrackQuantity", product.trackQuantity.toString());
  formData.append("IsActive", product.isActive.toString());
  formData.append("IsFeatured", product.isFeatured.toString());
  formData.append("Weight", product.weight.toString());

  if (product.description) {
    formData.append("Description", product.description);
  }
  if (product.shortDescription) {
    formData.append("ShortDescription", product.shortDescription);
  }
  if (product.comparePrice) {
    formData.append("ComparePrice", product.comparePrice.toString());
  }
  if (product.dimensions) {
    formData.append("Dimensions", product.dimensions);
  }
  if (product.tags) {
    formData.append("Tags", product.tags);
  }
  if (product.categoryId) {
    formData.append("CategoryId", product.categoryId.toString());
  }

  // Handle images (for CreateProductDto)
  if ("images" in product && product.images && product.images.length > 0) {
    product.images.forEach((file: any) => {
      formData.append("Images", file); // No array indexing
    });
  }

  // Handle new images and image deletions (for UpdateProductDto)
  if (
    "newImages" in product &&
    product.newImages &&
    product.newImages.length > 0
  ) {
    product.newImages.forEach((file: any) => {
      formData.append("NewImages", file); // No array indexing
    });
  }
  if (
    "imageIdsToDelete" in product &&
    product.imageIdsToDelete &&
    product.imageIdsToDelete.length > 0
  ) {
    product.imageIdsToDelete.forEach((id: any) => {
      formData.append("ImageIdsToDelete", id.toString()); // No array indexing
    });
  }

  // Handle variants
  if (product.variants && product.variants.length > 0) {
    product.variants.forEach((variant: any, index: number) => {
      if (variant.id !== undefined && variant.id !== null) {
        formData.append(`Variants[${index}].Id`, variant.id.toString());
      }
      if (variant.sku) {
        formData.append(`Variants[${index}].SKU`, variant.sku);
      }
      if (variant.price !== undefined && variant.price !== null) {
        formData.append(`Variants[${index}].Price`, variant.price.toString());
      }
      if (variant.stockQuantity !== undefined) {
        formData.append(
          `Variants[${index}].StockQuantity`,
          variant.stockQuantity.toString()
        );
      }
      if (variant.isActive !== undefined) {
        formData.append(
          `Variants[${index}].IsActive`,
          variant.isActive.toString()
        );
      }
      if (variant.color) {
        formData.append(`Variants[${index}].Color`, variant.color);
      }
      if (variant.size) {
        formData.append(`Variants[${index}].Size`, variant.size);
      }
    });
  }

  // Debug FormData
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value instanceof File ? value.name : value);
  }

  return formData;
};

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
      query: (product) => ({
        url: "products",
        method: "POST",
        body: createProductFormData(product),
      }),
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
      query: (product) => ({
        url: `products/${product.id}`,
        method: "PUT",
        body: createProductFormData(product),
      }),
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

// Export utility functions
export { createProductFormData };
