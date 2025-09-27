import type { Product } from "./products.types";

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  parentCategoryId?: number;
  parentCategory?: Category;
  childCategories?: Category[];
  products?: Product[];
}
