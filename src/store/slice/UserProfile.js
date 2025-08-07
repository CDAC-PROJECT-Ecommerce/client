import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = JSON.parse(state?.user.userToken);
    const response = await api.post(
      "/api/profile/fetchByUsername",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const UserProfile = createSlice({
  name: "profile",
  initialState: {
    UserData: null,
    isLoading: false,
    isSidebarOpen: false,
  },
  reducers: {
    toggleProfile: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      toast.error("Something went wrong");
      state.isLoading = false;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.UserData = action.payload;
    });
  },
});

export const { toggleProfile } = UserProfile.actions;

export default UserProfile.reducer;
