import {decode} from 'base-64';
global.atob = decode;
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../models/user';
import agent from '../../utils/agent';
import {AxiosError} from 'axios';
import {jwtDecode} from 'jwt-decode';

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  email: string;
  phone_number: string;
};

export interface CurrentUser {
  currentUser: User;
  isFetching: boolean;
  error: boolean;
  displayError: string;
  accessToken: string | null;
}

const initialState: CurrentUser = {
  currentUser: {} as User,
  isFetching: false,
  error: false,
  displayError: '',
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    resetState: () => {
      return initialState;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.currentUser = jwtDecode(action.payload) as User;
    },
  },
});

export const login = createAsyncThunk<any, LoginParams>(
  'auth/login',
  async data => {
    const {email, password} = data;

    try {
      const response = await agent.Auth.login({
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  },
);

export const signup = createAsyncThunk<any, SignupParams>(
  'auth/login',
  async data => {
    try {
      const response = await agent.Auth.signup({
        ...data,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  },
);

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  setAccessToken,
  resetState,
} = authSlice.actions;

export default authSlice.reducer;
