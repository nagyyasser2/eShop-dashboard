import type { Product } from "./products.types";

export interface Category {
  Id: number;
  Name: string;
  Description?: string;
  ImageUrls: string[];
  IsActive: boolean;
  SortOrder: number;
  CreatedAt: string;
  Products?: Product[];
}

export interface CreateCategoryDto {
  Name: string;
  Description?: string;
  ImageUrls?: string[];
  IsActive?: boolean;
  SortOrder?: number;
  ImageFiles?: File[];
  imageUrlsToRemove?: string[];
}

export interface UpdateCategoryDto {
  Id: number;
  Name: string;
  Description?: string;
  ImageUrls?: string[];
  IsActive?: boolean;
  SortOrder?: number;
  ImageFiles?: File[];
  imageUrlsToRemove?: string[];
}

export interface CategoryDto extends Category {}
