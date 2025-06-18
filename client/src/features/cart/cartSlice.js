// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // 每个 item: {  _id, name, price, quantity }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 添加菜品到购物车
    addItemToCart: (state, action) => {
      const newItem = action.payload; // 应包含 { _id, name, price}
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },
    // 从购物车移除一个菜品（减少数量或移除）
    removeItemFromCart: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (!existingItem) return;

      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== _id);
      } else {
        existingItem.quantity -= 1;
      }
    },
    //更新数量
    updateItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      console.log('handleQuantityChange called:', { _id, quantity }); // 调试用
      const item = state.items.find((item) => item._id === _id);
      if (!item || quantity < 1) return;

      const diff = quantity - item.quantity;
      item.quantity = quantity;

      state.totalQuantity += diff;
      state.totalAmount += diff * item.price;
    },
    // 删除某项菜品（不管有几个）
    deleteItem: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.price * existingItem.quantity;
      state.items = state.items.filter((item) => item._id !== _id);
    },

    // 清空购物车
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
