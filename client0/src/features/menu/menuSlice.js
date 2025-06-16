import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/menu-items`;

// 示例异步请求菜单数据
export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        // 如果响应码不是 2xx，手动抛出错误
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      // 将错误传递到 rejected 状态中处理
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
