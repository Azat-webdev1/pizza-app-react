import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import { Pizza, SearchPizzaParams } from './types';


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, category, currentPage, search } = params;
    const { data } = await axios.get<Pizza[]>(`https://63f8f0986978b1f910655d17.mockapi.io/pizzas/`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 8,
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
