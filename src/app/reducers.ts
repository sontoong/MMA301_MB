import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';

const rootReducer = combineReducers({
  auth: loginReducer,
});

export default rootReducer;
