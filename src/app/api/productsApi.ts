import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateProductDto,
  UpdateProductDto,
  ProductDto,
} from "../../types/products.types";
import { API_BASE_URL } from "../../utils/constants";

// Helper function to create FormData for product DTOs
const createProductFormData = (
  product: CreateProductDto | UpdateProductDto
): FormData => {
  const formData = new FormData();

  formData.append("Name", product.Name);
  formData.append("Sku", product.Sku);
  formData.append("Price", String(product.Price));
  formData.append("StockQuantity", String(product.StockQuantity));
  formData.append("CategoryId", String(product.CategoryId));

  if (product.Id) formData.append("Id", String(product.Id));
  if (product.Description) formData.append("Description", product.Description);
  if (product.ShortDescription)
    formData.append("ShortDescription", product.ShortDescription);
  if (product.ComparePrice != null)
    formData.append("ComparePrice", String(product.ComparePrice));
  if (product.TrackQuantity != null)
    formData.append("TrackQuantity", String(product.TrackQuantity));
  if (product.IsActive != null)
    formData.append("IsActive", String(product.IsActive));
  if (product.IsFeatured != null)
    formData.append("IsFeatured", String(product.IsFeatured));
  if (product.Weight != null) formData.append("Weight", String(product.Weight));
  if (product.Dimensions) formData.append("Dimensions", product.Dimensions);
  if (product.Tags) formData.append("Tags", product.Tags);

  // ProductImages
  let imageIndex = 0;
  product.ProductImages?.forEach((img) => {
    if (img.IsDeletable) {
      // Send deleted images with Id and Path for backend to handle deletion
      if (img.Id)
        formData.append(`ProductImages[${imageIndex}].Id`, String(img.Id));
      if (img.Path)
        formData.append(`ProductImages[${imageIndex}].Path`, img.Path);
      formData.append(`ProductImages[${imageIndex}].IsDeletable`, String(true));
      imageIndex++;
    } else {
      // Send active images normally
      if (img.File)
        formData.append(`ProductImages[${imageIndex}].File`, img.File);
      if (img.Id)
        formData.append(`ProductImages[${imageIndex}].Id`, String(img.Id));
      formData.append(
        `ProductImages[${imageIndex}].IsPrimary`,
        String(img.IsPrimary ?? false)
      );
      imageIndex++;
    }
  });

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
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
    createProduct: builder.mutation<ProductDto, FormData>({
      query: (formData) => ({
        url: "products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<ProductDto, FormData>({
      query: (formData) => {
        const id = formData.get("Id");
        return {
          url: `products/${id}`,
          method: "PUT",
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

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

// Export utility functions
export { createProductFormData };
