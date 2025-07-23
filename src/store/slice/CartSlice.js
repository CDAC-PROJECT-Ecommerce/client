import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { products_list } from "./ProductSlice";

export const addToCart = createAsyncThunk("cart/add", async (id) => {
  // Write logic here to add cart in database
  toast.dismiss();
  toast.success("Added to cart");
  let val = products_list.filter((x) => x.id == id);
<<<<<<< HEAD
=======
  console.log(val);
>>>>>>> 7790dde (Admin Panel)
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
<<<<<<< HEAD
  reducers: {
    increment: (state, action) => {
      const id = action.payload;
      const item = state.Cart.find((product) => product.id === id);
      if (item) {
        item.quantity += 1;
        toast.dismiss();
        toast.success(`Quantity increased`);
      } else {
        toast.dismiss();
        toast.error("Item not found in cart");
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.Cart.find((product) => product.id === id);
      if (item) {
        if (item.quantity === 1) {
          toast.dismiss();
          toast.error("Quantity can't be less than 1");
        } else {
          item.quantity -= 1;
          toast.dismiss();
          toast.success(`Quantity decreased`);
        }
      } else {
        toast.error("Item not found in cart");
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.Cart.find((product) => product.id === id);
      if (item) {
        state.Cart = state.Cart.filter((product) => product.id !== id);
        toast.success(`Item removed from cart`);
      } else {
        toast.error("Item not found in cart");
      }
    },
  },
=======
  reducers: {},
>>>>>>> 7790dde (Admin Panel)
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
<<<<<<< HEAD
export const { increment, decrement, removeFromCart } = cartSlice.actions;
=======
>>>>>>> 7790dde (Admin Panel)

export default cartSlice.reducer;
