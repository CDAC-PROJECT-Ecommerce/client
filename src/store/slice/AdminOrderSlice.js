import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state?.user.userToken);
      const response = await api.get("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch admin orders");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }, { getState, rejectWithValue }) => {
    try {
      const token = JSON.parse(getState().user.userToken);

      const response = await api.put(
        `/api/admin/orders/status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated!");
      return response.data;
    } catch (err) {
      toast.error("Failed to update status");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        const { status, message } = action.payload || {};
        if (status === 401) {
          toast.error("Unauthorized user");
        } else {
          toast.error(message || "Failed to fetch orders");
        }
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        const { status, message } = action.payload || {};
        if (status === 401) {
          toast.error("Unauthorized user");
        } else {
          toast.error(message || "Failed to update orders");
        }
      });
  },
});

export default adminOrdersSlice.reducer;
