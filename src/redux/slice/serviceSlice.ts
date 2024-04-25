import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import agent from '../../utils/agent';
import {AxiosError} from 'axios';
import {
  AllServices,
  LaundryPack,
  Service,
  ServicePlaceOrder,
} from '../../models/service';

interface IService {
  currentService: Service | null;
  serviceOrderDetail: ServicePlaceOrder | null;
  services: Service[];
  allServices: AllServices;
  allLaundryPacks: LaundryPack[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: IService = {
  services: [],
  serviceOrderDetail: null,
  allServices: [],
  allLaundryPacks: [],
  currentService: null,
  isFetching: false,
  error: false,
  displayError: '',
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    chooseService: (state, action: PayloadAction<Service>) => {
      state.currentService = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllServicesOfAllServiceTypes.pending, state => {
        state.isFetching = true;
      })
      .addCase(
        getAllServicesOfAllServiceTypes.fulfilled,
        (state, {payload}) => {
          state.isFetching = false;
          state.allServices = payload;
        },
      );
    builder
      .addCase(getServiceById.pending, state => {
        state.isFetching = true;
      })
      .addCase(getServiceById.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.serviceOrderDetail = payload;
      });
    builder
      .addCase(getAllLaundryPacks.pending, state => {
        state.isFetching = true;
      })
      .addCase(getAllLaundryPacks.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.allLaundryPacks = payload;
      });
  },
});

export const getAllServiceOfAServiceType = createAsyncThunk<
  Service[] | null,
  Service['service_id']
>('service/getAllServiceOfAServiceType', async serviceId => {
  try {
    const response = await agent.Services.getAllServiceOfAServiceType(
      serviceId,
    );
    // console.log(response);
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

export const getAllServicesOfAllServiceTypes = createAsyncThunk<AllServices>(
  'service/getAllServicesOfAllServiceTypes',
  async () => {
    try {
      const response = await agent.Services.getAllServicesOfAllServiceTypes();
      // console.log('services:', response);
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

export const getServiceById = createAsyncThunk<
  ServicePlaceOrder | null,
  Service['service_id']
>('service/getServiceById', async id => {
  try {
    const response = await agent.Services.getServiceById({service_id: id});
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

export const getAllLaundryPacks = createAsyncThunk<LaundryPack[]>(
  'service/getAllLaundryPacks',
  async () => {
    try {
      const response = await agent.Services.getAllLaundryPacks();
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

export const {chooseService} = serviceSlice.actions;

export default serviceSlice.reducer;
