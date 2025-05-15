import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
