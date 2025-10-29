import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- NEW: Thunk for verifying a payment ---
export const verifyPayment = createAsyncThunk(
  'payment/verify',
  async (paymentData, { getState, rejectWithValue }) => {
    try {
      const { auth: { token } } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const response = await axios.post('/api/v1/payments/verify', paymentData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Payment verification failed'
      );
    }
  }
);

const initialState = {
  paymentHistory: [],
  isLoading: false,
  isSuccess: false,
  error: null,
  message: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // --- NEW: Cases for payment verification ---
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
