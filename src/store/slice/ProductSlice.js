import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import jsonProductsData from "../../admin/data/products.json";

// 🔹 Static demo product list (if needed elsewhere)
export const products_list = [
  { id: 1, name: "Wireless Mouse", review: 4.2, price: 499.99, quantity: 1 },
  { id: 2, name: "Bluetooth Speaker", review: 4.2, price: 1299.5, quantity: 1 },
  { id: 3, name: "Gaming Keyboard", review: 3.2, price: 2499.0, quantity: 1 },
  { id: 4, name: "USB-C Charger", review: 4.6, price: 799.0, quantity: 1 },
  { id: 5, name: "Smart LED Bulb", review: 4.8, price: 349.75, quantity: 1 },
  { id: 6, name: "Noise Cancelling Headphones", review: 4.2, price: 4599.99, quantity: 1 },
  { id: 7, name: "External Hard Drive", review: 4.1, price: 3799.0, quantity: 1 },
  { id: 8, name: "Portable SSD", review: 4.3, price: 6999.99, quantity: 1 },
  { id: 9, name: "Fitness Band", review: 4.9, price: 1599.0, quantity: 1 },
  { id: 10, name: "Webcam HD", review: 2.2, price: 1099.5, quantity: 1 },
];

// 🔹 Async Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return products_list;
});

export const fetchFullProduct = createAsyncThunk("products/fullPage", async (id) => {
  const data = products_list.find((x) => x.id === id);
  return data;
});

export const loadJsonProducts = createAsyncThunk(
  "products/loadJsonProducts",
  async () => {
    const products = jsonProductsData;
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
    return { products, categories };
  }
);

export const loadJsonProductsById = createAsyncThunk(
  "products/loadJsonProductsById",
  async (id) => {
    const product = jsonProductsData.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
);

// 🔹 Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    FullProduct: [],
    searchedProductList: [],
    jsonProducts: [],
    categories: [],
    jsonProductsById: null,
    isLoading: false,
    isError: false,
    toastMessage: "",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const updated = action.payload;
      const index = state.products.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.products[index] = updated;
      }
      toast.success("Product updated successfully!");
    },
    addCategory: (state, action) => {
      const newCategory = action.payload;
      if (!state.categories.includes(newCategory)) {
        state.categories.push(newCategory);
      }
    },
    sortBy: (state, action) => {
      switch (action.payload) {
        case "price":
          state.products = [...state.products].sort((a, b) => a.price - b.price);
          toast.success("Product sorted by price");
          break;
        case "name":
          state.products = [...state.products].sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          );
          toast.success("Product sorted by name");
          break;
      }
    },
    searchProducts: (state, action) => {
      const searchVal = action.payload.toLowerCase();
      state.searchedProductList = searchVal
        ? state.products.filter((item) =>
            item.name.toLowerCase().includes(searchVal)
          )
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Load dummy list
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage = action.error.message || "Failed to fetch products";
      })

      // Load full dummy product
      .addCase(fetchFullProduct.fulfilled, (state, action) => {
        state.FullProduct = action.payload;
      })

      // Load from JSON
      .addCase(loadJsonProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadJsonProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jsonProducts = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(loadJsonProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage = action.error.message || "Failed to load JSON products";
      })

      // Load JSON product by ID
      .addCase(loadJsonProductsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadJsonProductsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jsonProductsById = action.payload;
      })
      .addCase(loadJsonProductsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage = action.error.message || "Failed to load product by ID";
      });
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  sortBy,
  searchProducts,
  addCategory,
} = productSlice.actions;

export default productSlice.reducer;
