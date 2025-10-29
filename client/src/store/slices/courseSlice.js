import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Thunks for fetching courses ---
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchCourseById = createAsyncThunk('courses/fetchCourseById', async (courseId, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}`);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchInstructorCourses = createAsyncThunk('courses/fetchInstructorCourses', async (_, thunkAPI) => {
    try {
        const { token } = thunkAPI.getState().auth;
        const config = { headers: { 'x-auth-token': token } };
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses/my-courses`, config);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchEnrolledCourses = createAsyncThunk('courses/fetchEnrolledCourses', async (_, thunkAPI) => {
    try {
        const { token } = thunkAPI.getState().auth;
        const config = { headers: { 'x-auth-token': token } };
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses/my-enrollments`, config);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// --- Thunks for creating content ---
export const createCourse = createAsyncThunk('courses/createCourse', async (courseData, thunkAPI) => {
    try {
        const { token } = thunkAPI.getState().auth;
        const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/courses`, courseData, config);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.errors[0]?.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createModule = createAsyncThunk('courses/createModule', async (moduleData, { getState, rejectWithValue }) => {
    try {
        const { token } = getState().auth;
        const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/modules`, moduleData, config);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.errors[0]?.msg) || error.message || error.toString();
        return rejectWithValue(message);
    }
});

export const createLesson = createAsyncThunk('courses/createLesson', async (lessonData, { getState, rejectWithValue }) => {
    try {
        const { token } = getState().auth;
        const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/lessons`, lessonData, config);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.errors[0]?.msg) || error.message || error.toString();
        return rejectWithValue(message);
    }
});


const initialState = {
  courses: [],
  selectedCourse: null,
  status: 'idle',
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    reset: (state) => {
        state.status = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCourses.fulfilled, (state, action) => { state.status = 'succeeded'; state.courses = action.payload; })
      .addCase(fetchCourses.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchCourseById.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCourseById.fulfilled, (state, action) => { state.status = 'succeeded'; state.selectedCourse = action.payload; })
      .addCase(fetchCourseById.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(createCourse.pending, (state) => { state.status = 'loading'; })
      .addCase(createCourse.fulfilled, (state, action) => { state.status = 'succeeded'; state.courses.push(action.payload); })
      .addCase(createCourse.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchInstructorCourses.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => { state.status = 'succeeded'; state.courses = action.payload; })
      .addCase(fetchInstructorCourses.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchEnrolledCourses.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => { state.status = 'succeeded'; state.courses = action.payload; })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(createModule.fulfilled, (state, action) => {
        if (state.selectedCourse) {
          state.selectedCourse.modules.push(action.payload);
        }
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        if (state.selectedCourse) {
          const moduleIndex = state.selectedCourse.modules.findIndex(m => m.id === action.payload.moduleId);
          if (moduleIndex !== -1) {
            state.selectedCourse.modules[moduleIndex].lessons.push(action.payload);
          }
        }
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;

