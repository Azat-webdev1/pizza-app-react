import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import { Pizza, SearchPizzaParams } from './types';


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, category, currentPage, search } = params;
    const { data } = await axios.get<Pizza[]>(`${import.meta.env.VITE_APP_BASE_URL}/pizzas/`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 6,
          search,
          category,
          sortBy
        },
        identity,
      ),
    });
    return data;
  },
);
