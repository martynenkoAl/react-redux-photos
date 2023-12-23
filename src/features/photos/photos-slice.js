import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PHOTOS_API } from '../../config';

export const loadPhotos = createAsyncThunk(
  '@@photos/loadPhotos',
  async (_, { rejectedWithValue }) => {
    try {
      const res = await axios.get(PHOTOS_API);
      return res.data;
    } catch (err) {
      return rejectedWithValue(err);
    }
  }
);

const photosSlice = createSlice({
  name: '@@photos',
  initialState: {
    status: 'idle',
    error: null,
    list: [],
  },
  reducers: {
    deleteItem: (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPhotos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadPhotos.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadPhotos.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload;
      });
  },
});

export const { deleteItem } = photosSlice.actions;
export const photosReducer = photosSlice.reducer;

export const selectPhotosInfo = (state) => ({
  status: state.photos.status,
  error: state.photos.error,
  qty: state.photos.list.length,
});

export const selectPhotos = (state) => state.photos.list;
