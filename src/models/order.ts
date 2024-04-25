import {LaundryPack, Service, ServiceType} from './service';
import {User, UserInfo} from './user';

export type NewOrder = {
  user_id: string;
  service_id: string;
  laundry_pack_id: string;
  service_type_id: string;
};

export type LaundryOrder = {
  order_id: string;
  service_id: Service['service_id'];
  order_price: number;
  user_id: User['user_id'];
  laundry_pack_id: LaundryPack['laundry_pack_id'];
  service_type_id: ServiceType['service_type_id'];
  payment_status: string;
  note: string;
  order_status:
    | 'Processing'
    | 'Received'
    | 'Washing'
    | 'Finished'
    | 'Ended'
    | 'Canceled';
};

export type LaundryOrderInfo = {
  order_status:
    | 'Processing'
    | 'Received'
    | 'Washing'
    | 'Finished'
    | 'Ended'
    | 'Canceled';
  order_price: number;
  user: Pick<UserInfo, 'user_id' | 'full_name'>;
  service: Pick<Service, 'service_id' | 'service_name' | 'service_price'>;
  service_type: Pick<ServiceType, 'service_type_id' | 'service_type_name'>;
  laundry_pack: Pick<
    LaundryPack,
    'laundry_pack_id' | 'laundry_pack_name' | 'laundry_pack_price'
  >;
  order_progress: Pick<OrderProgress, 'order_status' | 'timestamp'>[];
};

export type OrderProgress = {
  order_progress_id: string;
  order_id: LaundryOrder['order_id'];
  order_status: LaundryOrder['order_status'];
  timestamp: string;
};
