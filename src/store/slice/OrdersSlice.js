import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersData from "../../admin/data/orders.json"; // ✅ static import

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  return ordersData;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateOrderLocally: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((o) => o.id === updatedOrder.id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateOrderLocally } = ordersSlice.actions;
export default ordersSlice.reducer;
