import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 异步下单请求
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = thunkAPI.getState().auth.token;
      console.log(token);
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ 一样
        },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '下单失败');
      }
      const data = await res.json();
      return data; // 返回下单结果，比如订单号等
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (
    { page = 1, limit = 10, date, search, sortField, sortOrder },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token; // 👈 从 Redux 中获取 token
      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', limit);
      if (date) params.set('date', date);
      if (search) params.set('search', search);
      if (sortField) params.set('sortField', sortField);
      if (sortOrder) params.set('sortOrder', sortOrder);

      // const res = await fetch(
      //   `http://localhost:5000/api/orders?${params.toString()}`
      // );
      const res = await fetch(
        `http://localhost:5000/api/orders?${params.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ 关键
          },
        }
      );
      if (!res.ok) {
        throw new Error('获取订单失败');
      }
      const data = await res.json();
      // console.log(data.orders, data.totalCount);
      return {
        orders: data.orders,
        totalCount: data.totalCount,
        currentPage: page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, updates }, thunkAPI) => {
    const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ 一样
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('更新失败');
    return await res.json();
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    totalCount: 0,
    status: 'idle', // 取代 loading 标志位
    error: null,
  },
  reducers: {
    clearOrderState(state) {
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '下单失败';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'; // 统一用 status 管理 loading 状态
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.orders;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '请求失败';
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;

        const index = state.list.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.list[index] = updatedOrder;
        }

        if (state.currentOrder && state.currentOrder._id === updatedOrder._id) {
          state.currentOrder = updatedOrder;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '更新订单失败';
      });
  },
});

export const { clearOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
