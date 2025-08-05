import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);
      const response = await api.post("/api/userorder/placeOrder", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error.response?.message;
      return rejectWithValue({ status, message });
    }
  }
);

export const fetchOrdersByUsername = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = JSON.parse(state.user.userToken);
    const response = await api.get("/api/userorder/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const UserOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    isLoading: false,
    OrderPlaced: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.OrderPlaced = action.payload;
    });

    builder.addCase(placeOrder.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default UserOrderSlice.reducer;
