import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  callReceived: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCallReceived: (state, action) => {
      state.callReceived = action.payload;
    },
  },
});

export const {setCallReceived} = chatSlice.actions;
