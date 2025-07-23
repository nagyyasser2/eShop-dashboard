import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";

// Enum for BannerPosition (matching eShopApi.Core.Enums.BannerPosition)
export type BannerPosition = "HomepageTop" | "HomepageMiddle" | "Footer";

export const BannerPosition = {
  HomepageTop: "HomepageTop",
  HomepageMiddle: "HomepageMiddle",
  Footer: "Footer",
} as const;

// Interface for BannerResponseDto
export interface BannerResponseDto {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  position: BannerPosition;
  isActive: boolean;
  sortOrder: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

// Interface for BannerCreateDto (using FormData for file upload)
export interface BannerCreateDto {
  title: string;
  description?: string;
  image: File;
  linkUrl?: string;
  buttonText?: string;
  position: BannerPosition;
  isActive?: boolean;
  sortOrder?: number;
  startDate?: string;
  endDate?: string;
}

// Interface for BannerUpdateDto
export interface BannerUpdateDto {
  id: number;
  title?: string;
  description?: string;
  image?: File;
  linkUrl?: string;
  buttonText?: string;
  position?: BannerPosition;
  isActive?: boolean;
  sortOrder?: number;
  startDate?: string;
  endDate?: string;
}

export const bannersApi = createApi({
  reducerPath: "bannersApi",
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
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    // GET: api/banners
    getBanners: builder.query<BannerResponseDto[], void>({
      query: () => ({
        url: "banners",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    // GET: api/banners/{id}
    getBanner: builder.query<BannerResponseDto, number>({
      query: (id) => ({
        url: `banners/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Banner", id }],
    }),

    // POST: api/banners
    createBanner: builder.mutation<BannerResponseDto, FormData>({
      query: (bannerData) => ({
        url: "banners",
        method: "POST",
        body: bannerData,
      }),
      invalidatesTags: ["Banner"],
    }),

    // PUT: api/banners/{id}
    updateBanner: builder.mutation<void, { id: number; bannerData: FormData }>({
      query: ({ id, bannerData }) => ({
        url: `banners/${id}`,
        method: "PUT",
        body: bannerData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Banner", id },
        "Banner",
      ],
    }),

    // DELETE: api/banners/{id}
    deleteBanner: builder.mutation<void, number>({
      query: (id) => ({
        url: `banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Banner", id },
        "Banner",
      ],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannersApi;
