import type { Category } from "./categories.types";

export interface Product {
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
  category?: Category;
  images?: Image[];
  variants?: Variant[];
}

// Variant
export interface Variant {
  id: number;
  sku: string;
  price?: number;
  stockQuantity: number;
  isActive: boolean;
  color: string;
  size: string;
  createdAt: string;
  productId: number;
  product?: Product;
}

// Image
export interface Image {
  id: number;
  url: string;
  altText?: string;
  productId: number;
}
