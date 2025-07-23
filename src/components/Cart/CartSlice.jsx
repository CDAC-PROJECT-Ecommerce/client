import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // {
    //   id: 1,
    //   name: "Wireless Headphones",
    //   image: "https://via.placeholder.com/100",
    //   spec: "Bluetooth, Noise Cancelling",
    //   price: 1999,
    //   quantity: 1,
    // },
    // {
    //   id: 2,
    //   name: "Gaming Mouse",
    //   image: "https://via.placeholder.com/100",
    //   spec: "RGB, 16000 DPI",
    //   price: 1499,
    //   quantity: 2,
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrement: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { increment, decrement, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
