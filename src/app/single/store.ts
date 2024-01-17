'use client';
import { configureStore } from '@reduxjs/toolkit';
import { DataSlice } from './singleSlice';

export const store = configureStore({
  reducer: {
    data: DataSlice.reducer,
  },
});
