import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface CurrentUser {
  id: string;
  email: string;
  avatar?: string;
  name: string;
  role: string;
  isFirstLogin: boolean;
}

export interface User {
  currentUser: CurrentUser;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: User = {
  currentUser: {name: 'abc'} as CurrentUser,
  isFetching: false,
  error: false,
  displayError: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure} = authSlice.actions;

export default authSlice.reducer;
