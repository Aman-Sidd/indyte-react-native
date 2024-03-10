import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './userSlice';
import {apiSlice} from './apiSlice';
import {chatSlice} from './chatSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    api: apiSlice.reducer,
    chat: chatSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
