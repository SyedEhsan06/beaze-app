// redux/slices/productSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    console.log(params);
    if(params.item!==undefined){
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.type}=${params.item}`
        );
        console.log(params);
        return { response: response.data, params: params };
      } catch (error) {
        throw error;
      }
    }
    
  }
);
let initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
  export const { addProduct } = productSlice.actions;
export const selectCategoryProduct = (state) => state.products.products;
export default productSlice.reducer;
