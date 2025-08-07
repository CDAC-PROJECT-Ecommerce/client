import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { api } from "../../../services/api";

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = JSON.parse(getState().user.userToken);
      const response = await api.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      toast.error("Failed to fetch categories");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Add a new category
export const addCategories = createAsyncThunk(
  "products/addCategory",
  async (categoryName, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = JSON.parse(getState().user.userToken);
      const response = await api.post(
        "/api/categories",
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      dispatch(fetchCategories()); // refresh
      toast.success("Category added!");
      return response.data;
    } catch (err) {
      toast.error("Failed to add category");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { getState, rejectWithValue }) => {
    try {
      console.log("add product");
      const token = JSON.parse(getState().user.userToken);

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("stockQuantity", 100);
      // formData.append("image", productData.image); // File object

      const response = await api.post("/api/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product added!");
      return response.data;
    } catch (err) {
      toast.error("Failed to add product");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Get all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = JSON.parse(getState().user.userToken);
      const response = await api.get("/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sldiflja", response.data);
      return response.data;
    } catch (err) {
      toast.error("Failed to fetch products");
      return rejectWithValue(err.response?.data);
    }
  }
);

const adminProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        toast.error("Something went wrong");
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("builder", action.payload);
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default adminProductSlice.reducer;
