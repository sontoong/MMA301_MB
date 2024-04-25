import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IBottom {
  currentFunction: () => void;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: IBottom = {
  currentFunction: () => {},
  isFetching: false,
  error: false,
  displayError: '',
};

const bottomSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    setFunctionAndBindLoading: (
      state,
      action: PayloadAction<Pick<IBottom, 'currentFunction' | 'isFetching'>>,
    ) => {
      state.currentFunction = action.payload.currentFunction;
      state.isFetching = action.payload.isFetching;
    },
    resetFunctionAndBindLoading: state => {
      state.currentFunction = () => {};
      state.isFetching = false;
    },
  },
});

export const {setFunctionAndBindLoading, resetFunctionAndBindLoading} =
  bottomSlice.actions;

export default bottomSlice.reducer;
