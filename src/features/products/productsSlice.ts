import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductDto } from "../../types/products.types";
import type { RootState } from "../../app/store";

interface ProductsState {
  currentProduct: ProductDto;
  searchQuery: string;
  filters: {
    category: string;
    priceRange: [number, number];
    inStock: boolean;
  };
}

const initialState: ProductsState = {
  currentProduct: {
    Id: 0,
    Name: "",
    Sku: "",
    Price: 0,
    StockQuantity: 0,
    TrackQuantity: false,
    IsActive: false,
    IsFeatured: false,
    Weight: 0,
    CreatedAt: "",
    ProductImages: [],
    ShortDescription: "",
    ComparePrice: 0,
    Dimensions: "",
    Tags: "",
    CategoryId: 0,
    Category: {
      Id: 0,
      Name: "",
      ImageUrls: [],
      IsActive: false,
      SortOrder: 0,
      CreatedAt: "",
    },
  },
  searchQuery: "",
  filters: {
    category: "all",
    priceRange: [0, 1000],
    inStock: false,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct(state, action: PayloadAction<ProductDto>) {
      state.currentProduct = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
    },
    setPriceRangeFilter(state, action: PayloadAction<[number, number]>) {
      state.filters.priceRange = action.payload;
    },
    setInStockFilter(state, action: PayloadAction<boolean>) {
      state.filters.inStock = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setCurrentProduct,
  setSearchQuery,
  setCategoryFilter,
  setPriceRangeFilter,
  setInStockFilter,
  resetFilters,
} = productsSlice.actions;

export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;

export default productsSlice.reducer;
