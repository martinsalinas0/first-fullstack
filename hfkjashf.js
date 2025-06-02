import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const initialState = {
  products: [],
  categories: [],
  count: null,
  page: 1,
  totalPages: null,
  isLoading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, priceSort, page = 1, limit = 9 } = {}) => {
    const url = new URL(`${API_URL}/products`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);

    if (category) url.searchParams.append("category", category);
    if (priceSort) url.searchParams.append("priceSort", priceSort);

    const response = await axios.get(url.toString());

    const products = response.data.products || response.data;
    const categories = [...new Set(products.map((p) => p.category))];

    return {
      ...response.data,
      products,
      categories,
      page,
    };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.categories = action.payload.categories;
      state.count = action.payload.count || action.payload.products.length;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages || 1;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error fetching request.";
    });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
