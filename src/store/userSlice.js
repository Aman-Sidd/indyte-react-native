import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {user: null, waterintake: null, userdetails: null};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      if (action.payload != undefined) {
        state.user = {...state.user, ...action.payload};
      } else {
        state.user = null;
      }
    },
    userLogout: state => {
      state.user = null;
    },
    addWaterintake: (state, action) => {
      if (action.payload != undefined) {
        state.waterintake = {...action.payload};
      } else {
        state.waterintake = null;
      }
    },
    addUserDetails: (state, action) => {
      if (action.payload != undefined) {
        state.userdetails = {...action.payload};
      } else {
        state.userdetails = null;
      }
    },
  },
});
