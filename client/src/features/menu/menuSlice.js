import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/menu-items`;

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }

    return await response.json();
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
