import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  //   const response = await api.get("/products");

  return products_list;
});

export const fetchFullProduct = createAsyncThunk(
  "products/fullPage",
  async (id) => {
    const data = products_list.find((x) => x.id === id);
    return data;
  }
);

// Have to fetch dynamically from database
export const products_list = [
  { id: 1, name: "Wireless Mouse", review: 4.2, price: 499.99 },
  { id: 2, name: "Bluetooth Speaker", review: 4.2, price: 1299.5 },
  { id: 3, name: "Gaming Keyboard", review: 3.2, price: 2499.0 },
  { id: 4, name: "USB-C Charger", review: 4.6, price: 799.0 },
  { id: 5, name: "Smart LED Bulb", review: 4.8, price: 349.75 },
  { id: 6, name: "Noise Cancelling Headphones", review: 4.2, price: 4599.99 },
  { id: 7, name: "External Hard Drive", review: 4.1, price: 3799.0 },
  { id: 8, name: "Portable SSD", review: 4.3, price: 6999.99 },
  { id: 9, name: "Fitness Band", review: 4.9, price: 1599.0 },
  { id: 10, name: "Webcam HD", review: 2.2, price: 1099.5 },
];

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    FullProduct: [],
    isLoading: false,
    isError: false,
    toastMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.toastMessage = action.payload || "Failed to fetch products";
    });

    builder.addCase(fetchFullProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.FullProduct = action.payload;
    });
  },
});

export default productSlice.reducer;
