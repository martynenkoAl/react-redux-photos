import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: '@@filter',
  initialState: {
    filter: false,
  },
  reducers: {
    toggleFilter: (state) => {
      state.filter = !state.filter;
    },
  },
});

export const { toggleFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const selectFilter = (state) => state.filter.filter;
