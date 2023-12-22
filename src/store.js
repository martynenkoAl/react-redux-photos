import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import * as api from './config';
import { photosReducer } from './features/photos/photos-slice';
import { savedReducer } from './features/saved/saved-slice';
import { filterReducer } from './features/filter/filter-slice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    saved: savedReducer,
    filter: filterReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});
