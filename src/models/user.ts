import {LaundryOrder} from './order';
import {Service} from './service';

export type User = {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  password_hashed: string;
  email: string;
  phone_number: string;
  last_update: string;
  is_active: string;
  role_id: Role['role_id'];
  address: string;
};

export type OrderFromUserInfo = Pick<
  LaundryOrder,
  'order_id' | 'order_price' | 'order_status' | 'payment_status'
> &
  Pick<Service, 'service_name'>;

export type UserInfo = {
  address: string;
  email: string;
  full_name: string;
  orders: OrderFromUserInfo[];
  phone_number: string;
  user_id: string;
};

export type Role = {
  role_id: string;
  role_name: string;
};
