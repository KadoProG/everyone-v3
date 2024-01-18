'use client';

import { configureStore } from '@reduxjs/toolkit';
import { DataSlice } from '@/app/single/singleSlice';

export const store = configureStore({
  reducer: {
    data: DataSlice.reducer,
  },
});
