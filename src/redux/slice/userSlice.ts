import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import agent from '../../utils/agent';
import {AxiosError} from 'axios';
import {UserInfo} from '../../models/user';

interface IUser {
  currentUser: UserInfo;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: IUser = {
  currentUser: {} as UserInfo,
  isFetching: false,
  error: false,
  displayError: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserById.pending, state => {
        state.isFetching = true;
      })
      .addCase(getUserById.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.currentUser = payload;
      });
  },
});

export const getUserById = createAsyncThunk<UserInfo>(
  'user/getUserById',
  async (_, {getState}) => {
    const userId = getState().auth.currentUser.id;
    try {
      const response = await agent.User.getUserById({
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log({
          message: error.response?.data.error.message,
          status: error.response?.status,
        });
      }
    }
  },
);

export const {} = userSlice.actions;

export default userSlice.reducer;
