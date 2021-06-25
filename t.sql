CREATE TABLE _Agency (
  id          int IDENTITY NOT NULL, 
  external_id int NULL, 
  code        varchar(50) NULL, 
  name        varchar(255) NULL, 
  phone       int NULL, 
  fax         int NULL, 
  mail        int NULL, 
  PRIMARY KEY (id));
  
CREATE TABLE BaseOrderStatus (
  id    int IDENTITY NOT NULL, 
  label varchar(50) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Merchandise (
  id          int IDENTITY NOT NULL, 
  code        varchar(50) NOT NULL, 
  type        varchar(20) NOT NULL, 
  weight      float(10) NOT NULL, 
  bar_code    varchar(20) NOT NULL, 
  packages_nb int NULL, 
  instruction int NULL, 
  volume      float(10) NULL, 
  unit_volume varchar(10) NULL, 
  width       float(10) NULL, 
  length      float(10) NULL, 
  height      float(10) NULL, 
  unit_size   varchar(10) NULL, 
  Detailid    int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Operation (
  id             int IDENTITY NOT NULL, 
  service_id     int NOT NULL, 
  contract_id    int NOT NULL, 
  start_datetime date NULL, 
  end_datetime   date NULL, 
  Orderid        int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE [Order] (
  id                      int IDENTITY NOT NULL, 
  contract_id             int NOT NULL, 
  agency_responsible_id   int NOT NULL, 
  third_party_invoiced_id int NOT NULL, 
  agency_sender_id        int NULL, 
  address_sender          varchar(500) NOT NULL, 
  city_name_sender        varchar(100) NOT NULL, 
  country_name_receiver   varchar(50) NULL, 
  state_sender            varchar(50) NULL, 
  zipcode_sender          varchar(10) NOT NULL, 
  phone_sender            varchar(20) NOT NULL, 
  agency_receiver_id      int NULL, 
  address_receiver        varchar(500) NOT NULL, 
  city_name_receiver      varchar(100) NOT NULL, 
  country_name_sender     varchar(50) NULL, 
  state_receiver          varchar(50) NULL, 
  zipcode_receiver        varchar(10) NOT NULL, 
  phone_receiver          varchar(20) NOT NULL, 
  status_id               int NULL, 
  user_id                 int NULL, 
  creation_date           date NOT NULL, 
  [update]                date NOT NULL, 
  _Agencyid               int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Order_Constraint (
  id                      int IDENTITY NOT NULL, 
  pickup_start_datetime   date NOT NULL, 
  pickup_end_datetime     date NOT NULL, 
  pickup_instruction      varchar(255) NULL, 
  delivery_start_datetime date NOT NULL, 
  delivery_end_datetime   date NOT NULL, 
  delivery_instruction    varchar(255) NULL, 
  Orderid                 int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE OrderStatus (
  id            int IDENTITY NOT NULL, 
  status_id     int NOT NULL, 
  comment       varchar(500) NULL, 
  user_id       int NOT NULL, 
  creation_date date NOT NULL, 
  Detailid      int NOT NULL, 
  PRIMARY KEY (id));
ALTER TABLE [Order] ADD CONSTRAINT FKOrder937220 FOREIGN KEY (_Agencyid) REFERENCES _Agency (id);
ALTER TABLE Operation ADD CONSTRAINT FKOperation295557 FOREIGN KEY (Orderid) REFERENCES [Order] (id);
ALTER TABLE Merchandise ADD CONSTRAINT FKMerchandis261587 FOREIGN KEY (Detailid) REFERENCES Operation (id);
ALTER TABLE OrderStatus ADD CONSTRAINT FKOrderStatu935637 FOREIGN KEY (Detailid) REFERENCES Operation (id);
ALTER TABLE Order_Constraint ADD CONSTRAINT FKOrder_Cons496056 FOREIGN KEY (Orderid) REFERENCES [Order] (id);
