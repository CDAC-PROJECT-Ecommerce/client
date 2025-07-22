import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { products_list } from "./ProductSlice";

export const addToCart = createAsyncThunk("cart/add", async (id) => {
  // Write logic here to add cart in database
  toast.dismiss();
  toast.success("Added to cart");
  let val = products_list.filter((x) => x.id == id);
  console.log(val);
  return val[0];
});

// Sample cart data for demonstration
const initialState = {
  Cart: [
    {
      id: 1000,
      name: "Samsung Galaxy S24",
      price: 65000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Phone",
      description: "Latest Samsung smartphone",
    },
    {
      id: 2000,
      name: "Apple MacBook Pro",
      price: 185000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Laptop",
      description: "14-inch MacBook Pro with M3 chip",
    },
    {
      id: 3000,
      name: "Sony WH-1000XM5",
      price: 29990,
      quantity: 2,
      image: "https://via.placeholder.com/100x100?text=Headphone",
      description: "Noise cancelling headphones",
    },
  ],
  taxRate: 0.18,
  deliveryCharge: 30,
  isError: false,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;

      state.Cart.push(action.payload);
    });
    builder.addCase(addToCart.pending, (state, action) => {
      toast.loading("Adding to cart");
      state.isLoading = true;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isError = true;
      toast.error("Something went wrong");
    });
  },
});

export default cartSlice.reducer;
