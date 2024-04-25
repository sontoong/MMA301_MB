import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import userReducer from './slice/userSlice';
import serviceReducer from './slice/serviceSlice';
import serviceTypeReducer from './slice/serviceTypeSlice';
import orderReducer from './slice/orderSlice';
import bottomSheetReducer from './slice/bottomSheetSlice';

const rootReducer = combineReducers({
  auth: loginReducer,
  user: userReducer,
  service: serviceReducer,
  serviceType: serviceTypeReducer,
  order: orderReducer,
  bottomSheet: bottomSheetReducer,
});

export default rootReducer;
