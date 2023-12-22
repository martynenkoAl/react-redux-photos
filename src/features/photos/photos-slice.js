import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadPhotos = createAsyncThunk(
  '@@photos/load-photos',
  (_, { extra: { client, api } }) => {
    return client.get(api.PHOTOS_API);
  }
);

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

const photosSlice = createSlice({
  name: '@@photos',
  initialState,
  reducers: {},
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
        state.list = action.payload.data;
      });
  },
});

export const photosReducer = photosSlice.reducer;

export const selectPhotosInfo = (state) => ({
  status: state.photos.status,
  error: state.photos.error,
  qty: state.photos.list.length,
});

export const selectPhotos = (state) => state.photos.list;
