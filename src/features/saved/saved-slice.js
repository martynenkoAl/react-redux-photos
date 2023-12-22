import { createSlice } from '@reduxjs/toolkit';
localStorage.clear();

const savedSlice = createSlice({
  name: '@@saved',
  initialState: {
    savedList: [],
  },
  reducers: {
    addSaved: (state, action) => {
      state.savedList.push(action.payload);
    },
    deleteSaved: (state, action) => {
      state.savedList = state.savedList.filter((el) => el !== action.payload);
    },
  },
});

export const { addSaved, deleteSaved } = savedSlice.actions;
export const savedReducer = savedSlice.reducer;
export const selectSaved = (state) => state.saved.savedList;
