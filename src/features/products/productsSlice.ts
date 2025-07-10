import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";

interface ProductsState {
  selectedProduct: Product | null;
  searchQuery: string;
  filters: {
    category: string;
    priceRange: [number, number];
    inStock: boolean;
  };
}

const initialState: ProductsState = {
  selectedProduct: null,
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
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
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
  setSelectedProduct,
  setSearchQuery,
  setCategoryFilter,
  setPriceRangeFilter,
  setInStockFilter,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
