import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Thunk for fetching all site content ---
export const fetchContent = createAsyncThunk('content/fetchContent', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/content`);
    return response.data;
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  content: {}, // Will store content as a key-value object
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default contentSlice.reducer;
