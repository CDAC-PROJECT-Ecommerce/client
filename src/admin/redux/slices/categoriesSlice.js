import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: ["Electronics", "Fashion", "Books", "Home", "Fitness", "Toys"],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = action.payload.trim();
      if (newCategory && !state.items.includes(newCategory)) {
        state.items.push(newCategory);
      }
    },
  },
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
