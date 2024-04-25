export type Service = {
  service_id: string;
  service_name: string;
  service_price: number;
  // service_type_id: ServiceType['service_type_id'];
  // is_under_service: boolean;
};

export type ServicePlaceOrder = {
  service_id: string;
  service_name: string;
  service_price: number;
  service_type: {
    service_type_name: ServiceType['service_type_name'];
    service_type_id: ServiceType['service_type_id'];
  };
};

export type ServiceType = {
  service_type_id: string;
  service_type_name: string;
  is_under_service: boolean;
};

export type AllServices = {
  service_type_id: string;
  service_type_name: string;
  is_under_service: boolean;
  services: Service[];
}[];

export type LaundryPack = {
  laundry_pack_id: string;
  laundry_pack_name: string;
  laundry_pack_price: number;
  is_under_service: boolean;
};
