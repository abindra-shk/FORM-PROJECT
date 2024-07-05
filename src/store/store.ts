import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import networkSlice from '../services/networkSlice';

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    network: networkSlice,
  },
});
