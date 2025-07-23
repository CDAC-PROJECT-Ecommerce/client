<<<<<<< HEAD
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
=======
// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Mock product list (should be replaced with real API call)
>>>>>>> 7790dde (Admin Panel)
export const products_list = [
  { id: 1, name: "Wireless Mouse", review: 4.2, price: 499.99, quantity: 1 },
  { id: 2, name: "Bluetooth Speaker", review: 4.2, price: 1299.5, quantity: 1 },
  { id: 3, name: "Gaming Keyboard", review: 3.2, price: 2499.0, quantity: 1 },
  { id: 4, name: "USB-C Charger", review: 4.6, price: 799.0, quantity: 1 },
  { id: 5, name: "Smart LED Bulb", review: 4.8, price: 349.75, quantity: 1 },
<<<<<<< HEAD
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
=======
  { id: 6, name: "Noise Cancelling Headphones", review: 4.2, price: 4599.99, quantity: 1 },
  { id: 7, name: "External Hard Drive", review: 4.1, price: 3799.0, quantity: 1 },
>>>>>>> 7790dde (Admin Panel)
  { id: 8, name: "Portable SSD", review: 4.3, price: 6999.99, quantity: 1 },
  { id: 9, name: "Fitness Band", review: 4.9, price: 1599.0, quantity: 1 },
  { id: 10, name: "Webcam HD", review: 2.2, price: 1099.5, quantity: 1 },
];

<<<<<<< HEAD
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
=======
// Async thunk to fetch product list
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return products_list;
});

// Async thunk to fetch a full product by ID
export const fetchFullProduct = createAsyncThunk("products/fullPage", async (id) => {
  const data = products_list.find((x) => x.id === id);
  return data;
});

const initialState = {
  items: [],
  products: [],
  FullProduct: null,
  searchedProductList: [],
  categories: ["Electronics", "Fashion", "Books", "Home", "Fitness", "Toys"],
  isLoading: false,
  isError: false,
  toastMessage: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const updated = action.payload;

      const indexItems = state.items.findIndex((p) => p.id === updated.id);
      if (indexItems !== -1) {
        state.items[indexItems] = updated;
      }

      const indexProducts = state.products.findIndex((p) => p.id === updated.id);
      if (indexProducts !== -1) {
        state.products[indexProducts] = updated;
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
      let sorted = [...state.products];
      switch (action.payload) {
        case "price":
          sorted.sort((a, b) => a.price - b.price);
          toast.success("Product sorted by price");
          break;
        case "review":
          sorted.sort((a, b) => a.review - b.review);
          toast.success("Product sorted by review");
          break;
        case "name":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          toast.success("Product sorted by name");
          break;
        default:
          break;
      }
      state.products = sorted;
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
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchFullProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FullProduct = action.payload;
      });
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addCategory,
  sortBy,
  searchProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
>>>>>>> 7790dde (Admin Panel)
