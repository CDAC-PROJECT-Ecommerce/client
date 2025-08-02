import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("profile/"+data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

 const profileSlice = createSlice({
   name: "profile",
  initialState: {
    UserProfileData :[],
    isLoading: false,
   
  },
  reducers:{}
,
extraReducers: (builder) => {

    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      const responseData = action.payload;
      console.log(responseData);
        state.UserProfileData = responseData.data;
    });

}
});

export default profileSlice.reducer;





