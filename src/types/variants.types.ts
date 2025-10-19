import type { Product } from "./products.types";

export interface CreateVariantDto {
  Id?: number;
  Sku: string;
  Price?: number;
  StockQuantity: number;
  IsActive?: boolean;
  Color?: string;
  Size?: string;
  ProductId?: number;
}

export interface UpdateVariantDto {
  Id?: number;
  Sku?: string;
  Price?: number;
  StockQuantity?: number;
  IsActive?: boolean;
  Color?: string;
  Size?: string;
}
export interface VariantDto {
  Id: number;
  Sku: string;
  Price: number;
  StockQuantity: number;
  IsActive: boolean;
  Color?: string;
  Size?: string;
  ProductId: number;
}

export interface Variant {
  Id: number;
  Name: string;
  Sku: string;
  Price?: number;
  StockQuantity: number;
  IsActive: boolean;
  Color?: string;
  Size?: string;
  CreatedAt: string;
  ProductId: number;
  Product?: Product;
}
