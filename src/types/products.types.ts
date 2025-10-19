import type { Category, CategoryDto } from "./categories.types";

export interface Product {
  Id: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number;
  StockQuantity: number;
  TrackQuantity: boolean;
  IsActive: boolean;
  IsFeatured: boolean;
  Weight: number;
  Dimensions?: string;
  Tags?: string;
  CreatedAt: string;
  CategoryId?: number;
  Category?: Category;
  ProductImages?: ProductImageDto[];
}

export interface CreateProductDto {
  Id?: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number;
  StockQuantity: number;
  TrackQuantity?: boolean;
  IsActive?: boolean;
  IsFeatured?: boolean;
  Weight?: number;
  Dimensions?: string;
  Tags?: string;
  CategoryId: number;
  ProductImages?: CreateProductImageDto[];
}

export interface ProductImageDto {
  Id: number;
  Path: string;
  IsPrimary: boolean;
  CreatedAt: Date;
  ProductId: number;
}

export interface CreateProductImageDto {
  Id?: number;
  File: File;
  Path?: string;
  IsPrimary: boolean;
  IsDeletable?: boolean;
}

export interface UpdateProductImageDto
  extends Omit<ProductImageDto, "IsPrimary" | "Path">,
    Partial<CreateProductImageDto> {
  Id: number;
  File?: File;
  Path?: string;
  IsPrimary: boolean;
  IsDeletable: boolean;
}

export interface UpdateProductDto {
  Id: number;
  Name: string;
  Description: string;
  ShortDescription: string;
  Sku: string;
  Price: number;
  ComparePrice: number;
  StockQuantity: number;
  TrackQuantity: boolean;
  IsActive: boolean;
  IsFeatured: boolean;
  Weight: number;
  Dimensions: string;
  Tags: string;
  CategoryId: number;
  ProductImages: UpdateProductImageDto[];
}

export interface ProductDto {
  Id: number;
  Name: string;
  Description?: string;
  ShortDescription: string;
  Sku: string;
  Price: number;
  ComparePrice: number;
  StockQuantity: number;
  TrackQuantity: boolean;
  IsActive: boolean;
  IsFeatured: boolean;
  Weight: number;
  Dimensions: string;
  Tags: string;
  CreatedAt: string;
  CategoryId: number;
  Category: CategoryDto;
  ProductImages: ProductImageDto[];
}
