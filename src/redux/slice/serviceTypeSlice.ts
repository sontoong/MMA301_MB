import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import agent from '../../utils/agent';
import {AxiosError} from 'axios';
import {ServiceType} from '../../models/service';

interface IServiceType {
  currentServiceType: ServiceType | null;
  serviceTypes: ServiceType[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: IServiceType = {
  serviceTypes: [],
  currentServiceType: null,
  isFetching: false,
  error: false,
  displayError: '',
};

const serviceSlice = createSlice({
  name: 'serviceType',
  initialState,
  reducers: {
    chooseServiceType: (state, action: PayloadAction<ServiceType>) => {
      if (
        state.currentServiceType?.service_type_id ===
        action.payload.service_type_id
      ) {
        state.currentServiceType = null;
        return;
      } else {
        state.currentServiceType = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllServiceTypes.pending, state => {
        state.isFetching = true;
      })
      .addCase(getAllServiceTypes.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.serviceTypes = payload;
      });
  },
});

export const getAllServiceTypes = createAsyncThunk<ServiceType[]>(
  'serviceType/getAllServiceTypes',
  async () => {
    try {
      const response = await agent.Services.getAllServiceTypes();
      // console.log('servicetype:', response);
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

export const {chooseServiceType} = serviceSlice.actions;

export default serviceSlice.reducer;
