import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import { Pizza, SearchPizzaParams } from './types';


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage } = params;
    console.log(params, 3004);
    const { data } = await axios.get<Pizza[]>(`${import.meta.env.VITE_APP_BASE_URL}/pizzaLists/`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 6,
        },
        identity,
      ),
    });

    return data;
  },
);
