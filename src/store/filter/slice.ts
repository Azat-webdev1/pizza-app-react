import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';


const initialState: FilterSliceState = {
  currentPage: 1,
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.currentPage = 1;
      }
    },
  },
});

export const { setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;