import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './userSlice';
import {apiSlice} from './apiSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    api: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
