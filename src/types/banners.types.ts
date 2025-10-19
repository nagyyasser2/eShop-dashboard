// Enum for BannerPosition (matching eShopApi.Core.Enums.BannerPosition)
export type BannerPosition = "HomepageTop" | "HomepageMiddle" | "Footer";

export const BannerPosition = {
  HomepageTop: "HomepageTop",
  HomepageMiddle: "HomepageMiddle",
  Footer: "Footer",
} as const;

// Interface for BannerResponseDto
export interface BannerResponseDto {
  Id: number;
  Title: string;
  Description?: string;
  ImageUrl: string;
  LinkUrl?: string;
  ButtonText?: string;
  Position: BannerPosition;
  IsActive: boolean;
  SortOrder: number;
  StartDate: string;
  EndDate?: string;
  CreatedAt: string;
}

// Interface for BannerCreateDto (using FormData for file upload)
export interface BannerCreateDto {
  Title: string;
  Description?: string;
  Image: File;
  LinkUrl?: string;
  ButtonText?: string;
  Position: BannerPosition;
  IsActive?: boolean;
  SortOrder?: number;
  StartDate?: string;
  EndDate?: string;
}

// Interface for BannerUpdateDto
export interface BannerUpdateDto {
  Id: number;
  Title?: string;
  Description?: string;
  Image?: File;
  LinkUrl?: string;
  ButtonText?: string;
  Position?: BannerPosition;
  IsActive?: boolean;
  SortOrder?: number;
  StartDate?: string;
  EndDate?: string;
}
