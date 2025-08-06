import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";

// Fetch all products (authorized)
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);
      const response = await api.get("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

// Fetch full product details (authorized)
export const fetchFullProduct = createAsyncThunk(
  "products/fullPage",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);
      const response = await api.get(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

// Load all products (admin only)
export const loadJsonProducts = createAsyncThunk(
  "products/loadJsonProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);
      const response = await api.get("/api/admin/viewproduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data;
      const categories = [
        ...new Set(products.map((p) => p.categoryName).filter(Boolean)),
      ];
      return { products, categories };
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

// Load product by ID (admin only)
export const loadJsonProductsById = createAsyncThunk(
  "products/loadJsonProductsById",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);
      const response = await api.get(`/api/admin/viewproduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    masterProductList: [],
    FullProduct: [],
    searchedProductList: [],
    jsonProducts: [],
    categories: [],
    ProductCategories: [],
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
      toast.success("✅ Product added successfully");
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      toast.success("🗑️ Product deleted");
    },
    updateProduct: (state, action) => {
      const updated = action.payload;
      const index = state.products.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.products[index] = updated;
        toast.success("✏️ Product updated");
      }
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
          state.products = [...state.products].sort(
            (a, b) => a.price - b.price
          );
          toast.success("Sorted by price");
          break;
        case "name":
          state.products = [...state.products].sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          );
          toast.success("Sorted by name");
          break;
      }
    },
    filterByCategory: (state, action) => {
      const filterCategoryVal = action.payload;
      if (filterCategoryVal.length > 0) {
        state.products = state.masterProductList.filter((x) =>
          filterCategoryVal.includes(x.categoryName)
        );
      } else {
        state.products = state.masterProductList;
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
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const temp = action.payload.map((p) => p.categoryName);
      const cat = [...new Set(temp)];
      state.ProductCategories = cat;
      state.isLoading = false;
      state.products = [...action.payload];
      state.masterProductList = [...action.payload];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      const { status, message } = action.payload || {};
      toast.error(message || "❌ Failed to fetch products");
    });

    builder.addCase(fetchFullProduct.fulfilled, (state, action) => {
      state.FullProduct = action.payload;
    });

    builder.addCase(loadJsonProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadJsonProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jsonProducts = action.payload.products;
      state.categories = action.payload.categories;
    });
    builder.addCase(loadJsonProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.toastMessage =
        action.payload?.message || "Failed to load JSON products";
    });

    builder.addCase(loadJsonProductsById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadJsonProductsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jsonProductsById = action.payload;
    });
    builder.addCase(loadJsonProductsById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.toastMessage =
        action.payload?.message || "Failed to load product by ID";
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
  filterByCategory,
} = productSlice.actions;

export default productSlice.reducer;
