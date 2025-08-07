import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { api } from "../../services/api";

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
      const token = JSON.parse(getState().user.userToken);

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("stockQuantity", 100);
      formData.append("image", productData.image); // File object

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
      return response.data;
    } catch (err) {
      toast.error("Failed to fetch products");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = JSON.parse(getState().user.userToken);
      await api.delete(`/api/admin/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted!");
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = JSON.parse(getState().user.userToken);
      const response = await api.get(`/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedData, { getState, rejectWithValue }) => {
    try {
      console.log("Updated data: ", updatedData);
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("price", updatedData.price);
      formData.append("description", updatedData.description);
      formData.append("stockQuantity", 100);
      const token = JSON.parse(getState().user.userToken);
      const response = await api.put(
        `/api/admin/products/${updatedData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const adminProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    fullProduct: null,
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
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to add products");
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Product updated");
      })
      .addCase(getProductById.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.fullProduct = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
