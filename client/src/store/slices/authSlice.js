import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage if it exists
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  // Ensure we get the token from the user object if it exists
  token: user ? user.token : null, 
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Async thunk for registering a user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const response = await axios.post(`${apiUrl}/auth/register`, userData);
      
      if (response.data) {
        // Store user data and token in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors[0].msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- THIS IS THE NEW LOGIN FUNCTION ---
// Async thunk for logging in a user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const response = await axios.post(`${apiUrl}/auth/login`, userData);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors[0].msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      // --- ADDED CASES FOR LOGIN LIFECYCLE ---
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;

