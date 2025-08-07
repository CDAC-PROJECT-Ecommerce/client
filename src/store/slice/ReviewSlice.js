import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (reviewData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state?.user.userToken);
      const response = await api.post(`/api/reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReviewByProductId = createAsyncThunk(
  "review/findByProductId",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = JSON.parse(state?.user.userToken);
      const response = await api.get(`/api/reviews/product/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  reviews: [],
  productReview: [],
  currentReview: null,
  hasReviewed: false,
  status: {
    create: { loading: false, error: null, success: false },
  },
};

const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewStatus: (state) => {
      state.status.create = initialState.status.create;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.status.create = { loading: true, error: null, success: false };
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status.create = { loading: false, error: null, success: true };
        state.reviews.push(action.payload);
        toast.success("Review submitted");
        state.hasReviewed = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status.create = {
          loading: false,
          error: action.payload,
          success: false,
        };
      })
      .addCase(fetchReviewByProductId.fulfilled, (state, action) => {
        state.productReview = action.payload;
      });
  },
});

export const { resetReviewStatus } = ReviewSlice.actions;
export default ReviewSlice.reducer;
