import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const addAddress = createAsyncThunk(
  "address/add",
  async (addressData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);

      const response = await api.post("/api/address", addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add address");
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "address/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);

      const response = await api.get("/api/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add address");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);

      const response = await api.delete("/api/address/" + addressId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to delete address");
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (addressId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state.user.userToken);

      const response = await api.put(
        `/api/address/default/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to set default address");
    }
  }
);

const initialState = {
  defaultAddress: null,
  addresses: [],
  selectedAddressId: null,
  isLoading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle addAddress async actions
    builder.addCase(addAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addresses = [...state.addresses, action.payload];

      if (action.payload.default || state.addresses.length === 1) {
        state.defaultAddress = action.payload;
        state.selectedAddressId = action.payload.id;
      }
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.isLoading = false;
      // Enter error code later
    });

    builder.addCase(deleteAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addresses = [...action.payload];

      const defaultAddr = state.addresses.find((addr) => addr.default);
      state.defaultAddress = defaultAddr || null;

      const stillExists = state.addresses.find(
        (addr) => addr.id === state.selectedAddressId
      );
      if (!stillExists) {
        state.selectedAddressId =
          defaultAddr?.id || state.addresses[0]?.id || null;
      }
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.payload;
    });

    builder.addCase(fetchAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addresses = [...action.payload];
      const defaultAddr = state.addresses.find((addr) => addr.default);

      if (defaultAddr) {
        state.defaultAddress = defaultAddr;
        state.selectedAddressId = defaultAddr.id;
      }
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.payload;
    });

    builder.addCase(setDefaultAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setDefaultAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addresses = [...action.payload];
      const defaultAddr = state.addresses.find((addr) => addr.default);
      if (defaultAddr) {
        state.defaultAddress = defaultAddr;
        state.selectedAddressId = defaultAddr.id;
      }
    });
    builder.addCase(setDefaultAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { selectAddress } = addressSlice.actions;
export default addressSlice.reducer;
