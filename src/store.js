import axios from 'axios';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { photosReducer } from './features/photos/photos-slice';
import { savedReducer } from './features/saved/saved-slice';
import { filterReducer } from './features/filter/filter-slice';

const rootReducer = combineReducers({
  photos: photosReducer,
  saved: savedReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
