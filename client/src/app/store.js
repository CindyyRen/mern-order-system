// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import categoryReducer from '../features/category/categorySlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
  },
});

export default store;
