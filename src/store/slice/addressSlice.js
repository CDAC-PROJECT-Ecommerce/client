import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate API calls
// const mockApiCall = (actionType, data) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`${actionType} success:`, data);
//       resolve(data);
//     }, 1000);
//   });

// // Async thunks
// export const addAddress = createAsyncThunk(
//   "address/addAddress",
//   async (addressData, { rejectWithValue }) => {
//     try {
//       // Simulate an API call to add the address
//       const newAddress = { ...addressData, id: Date.now(), isDefault: false };
//       await mockApiCall("Add Address", newAddress);
//       return newAddress;
//     } catch (error) {
//       return rejectWithValue("Failed to add address");
//     }
//   }
// );

// export const deleteAddress = createAsyncThunk(
//   "address/deleteAddress",
//   async (addressId, { rejectWithValue }) => {
//     try {
//       // Simulate an API call to delete the address
//       await mockApiCall("Delete Address", addressId);
//       return addressId;
//     } catch (error) {
//       return rejectWithValue("Failed to delete address");
//     }
//   }
// );

// export const setDefaultAddress = createAsyncThunk(
//   "address/setDefaultAddress",
//   async (addressId, { rejectWithValue }) => {
//     try {
//       // Simulate an API call to set a default address
//       await mockApiCall("Set Default Address", addressId);
//       return addressId;
//     } catch (error) {
//       return rejectWithValue("Failed to set default address");
//     }
//   }
// );

const initialState = {
  defaultAddress: {
    id: 1,
    name: "John Doe",
    phone: "+91 98765 43210",
    address: "123, MG Road, Camp",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    isDefault: true,
  },

  addresses: [
    {
      id: 2,
      name: "John Doe1",
      phone: "+91 98765 43210",
      address: "123, MG Road, Camp",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      isDefault: false,
    },
  ],
  selectedAddressId: 1,
  status: "idle", // track loading status
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
    addAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        id: Date.now(),
        isDefault: false,
      };
      state.addresses.push(newAddress);
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
    setDefaultAddress: (state, action) => {
      // Remove default from all addresses
      state.defaultAddress.isDefault = false;
      state.addresses.forEach((addr) => (addr.isDefault = false));

      // Set new default
      const addressToSetDefault = state.addresses.find(
        (addr) => addr.id === action.payload
      );
      if (addressToSetDefault) {
        addressToSetDefault.isDefault = true;
        state.defaultAddress = addressToSetDefault;
        state.selectedAddressId = action.payload;
      }
    },
  },
  //   extraReducers: (builder) => {
  //     // Handle addAddress async actions
  //     builder.addCase(addAddress.pending, (state) => {
  //       state.status = "loading";
  //     });
  //     builder.addCase(addAddress.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.addresses.push(action.payload);
  //     });
  //     builder.addCase(addAddress.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.payload;
  //     });

  //     // Handle deleteAddress async actions
  //     builder.addCase(deleteAddress.pending, (state) => {
  //       state.status = "loading";
  //     });
  //     builder.addCase(deleteAddress.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.addresses = state.addresses.filter(
  //         (addr) => addr.id !== action.payload
  //       );
  //     });
  //     builder.addCase(deleteAddress.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.payload;
  //     });

  //     // Handle setDefaultAddress async actions
  //     builder.addCase(setDefaultAddress.pending, (state) => {
  //       state.status = "loading";
  //     });
  //     builder.addCase(setDefaultAddress.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       const addressToSetDefault = state.addresses.find(
  //         (addr) => addr.id === action.payload
  //       );
  //       if (addressToSetDefault) {
  //         state.defaultAddress = { ...addressToSetDefault, isDefault: true };
  //         state.selectedAddressId = action.payload;
  //         state.addresses.forEach((addr) => {
  //           if (addr.id !== action.payload) addr.isDefault = false;
  //         });
  //       }
  //     });
  //     builder.addCase(setDefaultAddress.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.payload;
  //     });
  //   },
});

export const { addAddress, selectAddress, deleteAddress, setDefaultAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
