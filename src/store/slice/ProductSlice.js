import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import jsonProductsData from "../../admin/data/products.json";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
    // return rejectWithValue({ status, message });
  }
});

export const fetchFullProduct = createAsyncThunk(
  "products/fullPage",
  async (id) => {
    try {
      const respone = await api.get(`/api/products/${id}`);
      return respone.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.respone?.message;
      return { status, message };
    }
    return data;
  }
);

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

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    masterProductList: [],
    FullProduct: [],
    searchedProductList: [],
    jsonProducts: [],
    categories: [],
    //Productpage category
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
          state.products = [...state.products].sort(
            (a, b) => a.price - b.price
          );
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
    // Load dummy list
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
      if (status !== 200) {
        toast.error("Failed to fetch product");
      } else {
        toast.error(message);
      }
    });

    builder.addCase(fetchFullProduct.fulfilled, (state, action) => {
      state.FullProduct = action.payload;
    });

    // Load from JSON
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
        action.error.message || "Failed to load JSON products";
    });

    // Load JSON product by ID
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
        action.error.message || "Failed to load product by ID";
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
