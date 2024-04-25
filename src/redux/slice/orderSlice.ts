import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import agent from '../../utils/agent';
import {AxiosError} from 'axios';
import {LaundryOrder, LaundryOrderInfo, NewOrder} from '../../models/order';

interface IOrder {
  currentOrder: LaundryOrderInfo | null;
  orders: LaundryOrder[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
  orderSuccess: string | null;
}

const initialState: IOrder = {
  currentOrder: null,
  orders: [],
  isFetching: false,
  error: false,
  displayError: '',
  orderSuccess: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderSuccess: state => {
      state.orderSuccess = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createNewOrder.pending, state => {
        state.isFetching = true;
      })
      .addCase(createNewOrder.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.orderSuccess = payload.order_id;
      });
    builder
      .addCase(getOrderById.pending, state => {
        state.isFetching = true;
      })
      .addCase(getOrderById.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.currentOrder = payload;
      });
    builder
      .addCase(cancelOrder.pending, state => {
        state.isFetching = true;
      })
      .addCase(cancelOrder.fulfilled, (state, {payload}) => {
        state.isFetching = false;
      });
  },
});

export const createNewOrder = createAsyncThunk<
  LaundryOrder,
  Omit<NewOrder, 'user_id'>
>('order/createNewOrder', async (data, {getState}) => {
  const userId = getState().auth.currentUser.id;
  try {
    const response = await agent.Orders.createNewOrder({
      ...data,
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
});

export const getOrderById = createAsyncThunk<
  LaundryOrderInfo,
  LaundryOrder['order_id']
>('order/getOrderById', async data => {
  try {
    const response = await agent.Orders.getOrderById({
      order_id: data,
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
});

export const cancelOrder = createAsyncThunk<
  LaundryOrderInfo,
  LaundryOrder['order_id']
>('order/cancelOrder', async data => {
  try {
    const response = await agent.Orders.cancelOrder({
      order_id: data,
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
});

export const {clearOrderSuccess} = orderSlice.actions;

export default orderSlice.reducer;
