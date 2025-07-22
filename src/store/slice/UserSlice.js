import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk("users/register", async (data) => {
  return data;
});

export const loginUser = createAsyncThunk("users/login", async (data) => {
  const { username, password } = data;
  console.log(data);
  if (username === "demo" && password === "1234") {
    toast.success("Login sucessfull");
    return { username: "Ravi", token: "laksdjfo0sudfafsoah0a7sfd0" };
  } else {
    toast.error("login failed");
  }
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    Users: [],
    TempUsers: [],
    isLoading: false,
    isLoggedIn: false,
    isError: false,
    toastMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(registerUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.Users = action.payload;
    // });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Users = action.payload;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("User registered");
      state.TempUsers = [...state.Users, action.payload];
    });
  },
});

export default UserSlice.reducer;
