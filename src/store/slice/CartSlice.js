import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../services/api";

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.userToken;
      const response = await api.post("/api/cart/add", data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.message;
      return { status, message };
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.userToken;
      if (token === null) {
        toast.error("Please login");
        return;
      }
      const respone = await api.get("/api/cart/fetchCart", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return respone.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.message;
      return { status, message };
    }
  }
);

export const changeQuantity = createAsyncThunk(
  "cart/change",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.userToken;
      if (token === null) {
        toast.error("Please login");
        return;
      }
      const response = await api.put("/api/cart/changeQuantity", data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.message;
      return { status, message };
    }
  }
);

// Sample cart data for demonstration
const initialState = {
  Cart: [],
  taxRate: 0.18,
  deliveryCharge: 30,
  isError: false,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart(state) {
      state.Cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Item added in cart");
      state.isLoading = false;
      console.log(action.payload);
      state.Cart = [...action.payload.items];
    });
    builder.addCase(addToCart.pending, (state, action) => {
      toast.loading("Adding to cart");
      state.isLoading = true;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      const { status, message } = action.payload || {};
      if (status === 401) {
        toast.error("Failed to add in cart");
      } else {
        toast.error(message);
      }
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Cart = [...action.payload.items];
    });
    builder.addCase(fetchCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      const { status, message } = action.payload || {};
      if (status === 401) {
        toast.error("Failed to fetch cart");
      } else {
        toast.error(message);
      }
    });

    // Change quantity
    builder.addCase(changeQuantity.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Quantity changed");
      state.isLoading = false;
      state.Cart = [...action.payload.items];
    });
    builder.addCase(changeQuantity.pending, (state, action) => {
      toast.loading("Adding to cart");
      state.isLoading = true;
    });
    builder.addCase(changeQuantity.rejected, (state, action) => {
      state.isLoading = false;
      const { status, message } = action.payload || {};
      if (status === 401) {
        toast.error("Failed to add in cart");
      } else {
        toast.error(message);
      }
    });
  },
});
export const { emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
