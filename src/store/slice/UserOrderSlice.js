import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const initiatePayment = createAsyncThunk(
  "order/initiatePayment",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);

      const orderResponse = await api.post("/api/userorder/placeOrder", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orderId = orderResponse.data.orderId;

      const razorpayResponse = await api.post(
        "/api/payment/createPayment",
        { amount: data.totalAmount, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        order: orderResponse.data,
        razorpay: razorpayResponse.data,
      };
    } catch (error) {
      const status = error?.response?.status;
      return rejectWithValue({ status });
    }
  }
);

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
    return response.data;
  }
);

const UserOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    isLoading: false,
    OrderPlaced: [],
    RazorpayOrder: [],
    MyOrders: [],
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

    // Razorpay payment builder casse
    builder.addCase(initiatePayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initiatePayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.OrderPlaced = action.payload.order;
      state.RazorpayOrder = action.payload.razorpay;
    });
    builder.addCase(initiatePayment.rejected, (state, action) => {
      state.isLoading = false;
    });

    // MyORDERS
    builder.addCase(fetchOrdersByUsername.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrdersByUsername.fulfilled, (state, action) => {
      state.isLoading = false;
      state.MyOrders = action.payload;
    });
    builder.addCase(fetchOrdersByUsername.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default UserOrderSlice.reducer;
