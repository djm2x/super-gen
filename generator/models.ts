export class Agency {
  id = 0;
  external_id = 0;
  code = '';
  name = '';
  phone = '';
  fax = '';
  mail = '';

  orders: Order[] = [];
}

export class BaseOrderStatus {
  id = 0;
  label = '';
}

export class Merchandise {
  id          = 0;
  code        = '';
  type        = '';
  weight      = 0;
  bar_code    = 0;
  packages_nb = 0;
  instruction = 0;
  volume      = 0;
  unit_volume = '';
  width       = 0;
  length      = 0;
  height      = 0;
  unit_size   = '';
  operation_id      = 0;
  operation: Operation;
}

export class Operation {
  id = 0;
  service_id      = 0;
  contract_id     = 0;
  start_datetime  = new Date();
  end_datetime    = new Date();
  operation_instruction = '';
  order_id         = 0;
  order: Order;
  orderStatuses: OrderStatus[] = [];
  merchandises: Merchandise[] = [];
}

export class Order {
  id = 0;
  contract_id              = 0;
  agency_responsible_id    = 0;
  third_party_invoiced_id  = 0;
  agency_sender_id         = 0;
  address_sender           = '';
  city_name_sender         = '';
  country_name_receiver    = '';
  state_sender             = '';
  zipcode_sender           = '';
  phone_sender             = '';
  agency_receiver_id       = 0;
  address_receiver         = '';
  city_name_receiver       = '';
  country_name_sender      = '';
  state_receiver           = '';
  zipcode_receiver         = '';
  phone_receiver           = '';
  status_id                = 0;
  user_id                  = 0;
  creation_date            = new Date();
  updated_date               = new Date();

  pickup_start_datetime   = new Date();
  pickup_end_datetime     = new Date();
  pickup_instruction      = '';
  delivery_start_datetime = new Date();
  delivery_end_datetime   = new Date();

  agency_id                = 0;
  agency: Agency;

  operations: Operation[] = [];
}


export class OrderStatus {
  id = 0;
  status_id     = 0;
  comment       = '';
  user_id       = 0;
  creation_date = new Date();
  operation_id      = 0;
  operation: Operation;
}
