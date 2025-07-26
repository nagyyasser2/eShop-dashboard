export interface CreateVariantDto {
  sku: string;
  price?: number;
  stockQuantity: number;
  isActive?: boolean;
  color?: string;
  size?: string;
  productId?: number;
}

export interface VariantDto {
  id: number;
  sku: string;
  price?: number;
  stockQuantity: number;
  isActive: boolean;
  color?: string;
  size?: string;
  createdAt: string;
  productId: number;
}

export interface UpdateProductDto {
  id: number;
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
  newImages?: File[];
  imageIdsToDelete?: number[];
}
