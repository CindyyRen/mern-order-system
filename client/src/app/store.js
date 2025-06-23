// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
import categoryReducer from '../features/category/categorySlice';
import orderReducer from '../features/order/orderSlice'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
