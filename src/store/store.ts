// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import todoSlice from '../features/todo/todoSlice';
import networkSlice from '../services/networkSlice';
import authSlice from '../pages/Auth/authSlice';

const rootReducer = combineReducers({
  todo: todoSlice,
  network: networkSlice,
  auth: authSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
