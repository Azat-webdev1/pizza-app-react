import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import pizza from './pizza/slice';
import filters from './filter/slice';


export const store = configureStore({
  reducer: {
    pizza,
    filters
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();