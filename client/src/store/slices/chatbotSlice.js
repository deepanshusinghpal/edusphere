import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async ({ message, context, type }, { getState, rejectWithValue }) => {
    try {
      const { auth: { token } } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ message, context, type });
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chatbot/ask`, body, config);
      return { botResponse: res.data.response };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || 'Something went wrong');
    }
  }
);

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    // Reducer to add user message to state immediately
    addUserMessage: (state, action) => {
        state.messages.push({ isUser: true, text: action.payload });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({ isUser: false, text: action.payload.botResponse });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.messages.push({
          isUser: false,
          text: `Sorry, I encountered an error: ${action.payload}`,
          isError: true,
        });
      });
  },
});

export const { addUserMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
