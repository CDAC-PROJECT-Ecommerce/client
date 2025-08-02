import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../services/api";

export const registerUser = createAsyncThunk(
  "users/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

//Fetch username and role if user is already logged in
export const fetchUsernameAndRole = createAsyncThunk(
  "users/username",
  async (data, { rejectWithValue }) => {
    try {
      data = { token: JSON.parse(data) };
      const response = await api.post("/api/auth/fetchUsernameAndRole", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.post("/api/auth/login", data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      return rejectWithValue({ status, message });
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  'users/fetchProfileById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/users/${formData.id}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    userToken: null,
    role: "USER",
    username: "",
    TempUsers: [],
    isLoading: false,
    isLoggedIn: false,
    toastMessage: "",
  },
  reducers: {
    // updateProfile(state, action) {
    //   const { name, email, mobile } = action.payload;
    //   state.name = name;
    //   state.email = email;
    //   state.mobile = mobile;
    // },
    changePassword(state, action) {
      state.password = action.payload;
    },

    // Fetch token from localstorage
    fetchToken(state, action) {
      const token = localStorage.getItem("shopee_token") || null;
      if (token !== null) {
        state.userToken = token;
      }
    },
    logout(state, action) {
      localStorage.removeItem("shopee_token");
      state.userToken = null;
      state.username = "";
      state.role = "USER";
      toast.success("Logout successfull");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      const { status, message } = action.payload || {};
      if (status === 401) {
        toast.error("Invalid username/password");
      } else {
        toast.error(message || "Login failed");
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const responseData = action.payload;

      localStorage.setItem("shopee_token", JSON.stringify(responseData.token));
      state.userToken = JSON.stringify(responseData.token);
      state.username = responseData.username;
      toast.success("Login successfully");
    });

    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      const { status, message } = action.payload || {};
      if (status === 409) {
        toast.error("User already exists");
      } else {
        toast.error(message || "Registration failed");
      }

      state.isError = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const responseData = action.payload;

      localStorage.setItem("shopee_token", JSON.stringify(responseData.token));
      state.userToken = JSON.stringify(responseData.token);
      state.username = responseData.username;
      toast.success("Registered successfully");
    });

    // builder.addCase(fetchUsernameAndRole.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchUsernameAndRole.rejected, (state, action) => {
    //   state.isLoading = false;
    //  toast.error("Something went wrong")
    // });

    builder.addCase(fetchUsernameAndRole.fulfilled, (state, action) => {
      console.log("first");
      state.username = action.payload.username;
      state.role = action.payload.role;
    });

    
    builder
    .addCase(fetchProfileById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });

  },
});

export const { fetchToken, logout, changePassword } =
  UserSlice.actions;
export default UserSlice.reducer;
