import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";

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
  { id: 1, name: "Wireless Mouse", review: 4.2, price: 499.99, quantity: 1 },
  { id: 2, name: "Bluetooth Speaker", review: 4.2, price: 1299.5, quantity: 1 },
  { id: 3, name: "Gaming Keyboard", review: 3.2, price: 2499.0, quantity: 1 },
  { id: 4, name: "USB-C Charger", review: 4.6, price: 799.0, quantity: 1 },
  { id: 5, name: "Smart LED Bulb", review: 4.8, price: 349.75, quantity: 1 },
  {
    id: 6,
    name: "Noise Cancelling Headphones",
    review: 4.2,
    price: 4599.99,
    quantity: 1,
  },
  {
    id: 7,
    name: "External Hard Drive",
    review: 4.1,
    price: 3799.0,
    quantity: 1,
  },
  { id: 8, name: "Portable SSD", review: 4.3, price: 6999.99, quantity: 1 },
  { id: 9, name: "Fitness Band", review: 4.9, price: 1599.0, quantity: 1 },
  { id: 10, name: "Webcam HD", review: 2.2, price: 1099.5, quantity: 1 },
];

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    FullProduct: [],
    searchedProductList: [],
    isLoading: false,
    isError: false,
    toastMessage: "",
  },
  reducers: {
    sortBy: (state, action) => {
      switch (action.payload) {
        case "price":
          const sortByPrice = [...state.products].sort((a, b) => {
            return a.price - b.price;
          });
          toast.success("Product sorted by price");

          state.products = sortByPrice;
          break;
        case "review":
          const sortByReview = [...state.products].sort((a, b) => {
            return a.review - b.review;
          });
          toast.success("Product sorted by review");
          state.products = sortByReview;
          break;
        case "name":
          const sortByName = [...state.products].sort((a, b) => {
            return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
          });
          toast.success("Product sorted by name");

          state.products = sortByName;
          break;
      }
      // state.selectedAddressId = action.payload;
    },
    searchProducts: (state, action) => {
      let searchVal = action.payload;
      if (searchVal.length !== 0) {
        const searchedVal = state.products.filter((items) => {
          return items.name.toLowerCase().includes(searchVal.toLowerCase());
        });
        state.searchedProductList = searchedVal;
      }
      if (searchVal.length === 0) {
        state.searchedProductList = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.toastMessage = action.payload || "Failed to fetch products";
    });

    builder.addCase(fetchFullProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.FullProduct = action.payload;
    });
  },
});
export const { sortBy, searchProducts } = productSlice.actions;
export default productSlice.reducer;
