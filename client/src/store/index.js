import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import chatbotReducer from './slices/chatbotSlice';
import paymentReducer from './slices/paymentSlice';
import contentReducer from './slices/contentSlice';
import categoryReducer from './slices/categorySlice'; // <-- ADD THIS IMPORT

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    chatbot: chatbotReducer,
    payment: paymentReducer,
    content: contentReducer,
    categories: categoryReducer, // <-- ADD THIS LINE
  },
});

