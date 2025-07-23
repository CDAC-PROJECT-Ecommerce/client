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
<<<<<<< HEAD
    return { username: "Ravi", token: "laksdjfo0sudfafsoah0a7sfd0" };
=======
    return { name: "Ravi", token: "laksdjfo0sudfafsoah0a7sfd0" };
>>>>>>> 7790dde (Admin Panel)
  } else {
    toast.error("login failed");
  }
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    Users: [],
<<<<<<< HEAD
    TempUsers: [],
=======
>>>>>>> 7790dde (Admin Panel)
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
<<<<<<< HEAD

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("User registered");
      state.TempUsers = [...state.Users, action.payload];
    });
=======
>>>>>>> 7790dde (Admin Panel)
  },
});

export default UserSlice.reducer;
