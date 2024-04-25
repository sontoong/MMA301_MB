import {AxiosResponse} from 'axios';
import apiJWT from './baseApi';
import {LoginParams} from '../redux/slice/loginSlice';

export interface IPagination {
  page: number;
  limit: number;
  search: string;
}

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, {params}).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
  patch: <T>(url: string, body: T) =>
    apiJWT.patch(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    apiJWT.delete(url, {params}).then(responseBody),
};

const authBase = 'auth';
const Auth = {
  login: (data: LoginParams) => requests.post(`${authBase}/login`, data),
  signup: (data: any) => requests.post('user/new-account', data),
};

const userBase = 'user';
const User = {
  getUserById: (data: any) => requests.post(`${userBase}/account`, data),
  updateUserInfomationById: (data: any) =>
    requests.patch(`${userBase}/account`, data),
};

const serviceBase = 'laundry';
const Services = {
  getAllServiceTypes: () => requests.get(`${serviceBase}/all-service-types`),
  getAllServiceOfAServiceType: (data: any) =>
    requests.post(`${serviceBase}/service-type`, data),
  getAllServicesOfAllServiceTypes: () =>
    requests.get(`${serviceBase}/service-type-menu`),
  getServiceById: (data: any) =>
    requests.post(`${serviceBase}/laundry-service`, data),
  getAllLaundryPacks: () => requests.get(`${serviceBase}/all-laundry-packs`),
};

const orderBase = 'order';
const Orders = {
  getOrderById: (data: any) => requests.post(`${orderBase}`, data),
  createNewOrder: (data: any) => requests.post(`${orderBase}/new-order`, data),
  cancelOrder: (data: any) => requests.del(`${orderBase}`, data),
};

const agent = {
  Auth,
  Services,
  Orders,
  User,
};
export default agent;
