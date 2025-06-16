import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/categories`;

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json();
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
