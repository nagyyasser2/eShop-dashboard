export interface CategoryForm {
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  parentCategoryId?: number;
  imageFiles?: FileList;
  imageUrlsToRemove?: string[];
}
