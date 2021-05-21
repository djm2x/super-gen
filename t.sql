CREATE TABLE Agency (
  id       int IDENTITY NOT NULL, 
  label    varchar(50) NOT NULL, 
  Clientid int NOT NULL, 
  Entityid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Bill_Criteria (
  id                     int IDENTITY NOT NULL, 
  tax_number             varchar(20) NOT NULL, 
  tax_code               varchar(10) NOT NULL, 
  effective_date         date NOT NULL, 
  settlement_bill_period int NOT NULL, 
  bill_frequency         int NOT NULL, 
  Payment_Methodid       int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE City (
  id        int IDENTITY NOT NULL, 
  name      varchar(80) NOT NULL, 
  code      varchar(10) NOT NULL, 
  Countryid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Contract (
  id                int IDENTITY NOT NULL, 
  code              int NULL, 
  label             int NULL, 
  settlement_period int NULL, 
  start_date        date NULL, 
  end_date          date NULL, 
  comment           varchar(255) NULL, 
  sales_id          int NULL, 
  Trackingid        int NOT NULL, 
  Entityid          int NOT NULL, 
  Tiers_Factureid   int NULL, 
  Payment_Methodid  int NOT NULL, 
  Contact_Typeid    int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Contract_Service (
  Contractid int NOT NULL, 
  Serviceid  int NOT NULL);
CREATE TABLE Contract_Type (
  id   int IDENTITY NOT NULL, 
  name varchar(255) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Country (
  id   int IDENTITY NOT NULL, 
  name varchar(50) NOT NULL, 
  code varchar(10) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Default_Package_Criteria (
  id              int IDENTITY NOT NULL, 
  unit_volume     float(10) NULL, 
  unit_weight     float(10) NULL, 
  packages_number int NULL, 
  PRIMARY KEY (id));
CREATE TABLE Document (
  id            int IDENTITY NOT NULL, 
  name          varchar(50) NOT NULL, 
  createdBy     int NOT NULL, 
  creation_date date NOT NULL, 
  path          varchar(255) NOT NULL, 
  Entityid      int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Entity (
  id                         int IDENTITY NOT NULL, 
  code                       varchar(50) NOT NULL, 
  label                      varchar(50) NULL, 
  name                       varchar(50) NOT NULL, 
  logoUrl                    varchar(255) NULL, 
  address                    varchar(255) NULL, 
  zip_code                   varchar(10) NULL, 
  phone                      varchar(15) NOT NULL, 
  fax                        varchar(15) NULL, 
  email                      varchar(50) NOT NULL, 
  type                       varchar(10) NOT NULL, 
  is_billable                bit NOT NULL, 
  Cityid                     int NOT NULL, 
  Default_Package_Criteriaid int NULL, 
  Bill_Criteriaid            int NULL, 
  Trackingid                 int NOT NULL, 
  Languageid                 int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE [Group] (
  id       int IDENTITY NOT NULL, 
  label    varchar(50) NOT NULL, 
  Entityid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Language (
  id   int IDENTITY NOT NULL, 
  name varchar(255) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Organization (
  id       int IDENTITY NOT NULL, 
  label    varchar(50) NOT NULL, 
  Groupeid int NOT NULL, 
  Entityid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Payment_Method (
  id   int IDENTITY NOT NULL, 
  name varchar(255) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Review (
  id           int IDENTITY NOT NULL, 
  score        float(10) NOT NULL, 
  comment      varchar(255) NULL, 
  creationDate int NOT NULL, 
  userId       int NOT NULL, 
  Entityid     int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Service (
  id             int IDENTITY NOT NULL, 
  code           int NULL, 
  label          int NULL, 
  start_date     date NOT NULL, 
  end_date       date NOT NULL, 
  description    varchar(255) NULL, 
  Trackingid     int NOT NULL, 
  Entityid       int NOT NULL, 
  Service_Typeid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Service_Type (
  id   int IDENTITY NOT NULL, 
  name varchar(255) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Status (
  id            int IDENTITY NOT NULL, 
  label         varchar(50) NOT NULL, 
  user_id       int NOT NULL, 
  creation_date int NOT NULL, 
  Entityid      int NOT NULL, 
  Serviceid     int NOT NULL, 
  Contractid    int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Tax_Sequence (
  id       int IDENTITY NOT NULL, 
  number   int NOT NULL, 
  code     varchar(50) NULL, 
  Agenceid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Third_Party_Invoiced (
  id       int IDENTITY NOT NULL, 
  label    varchar(50) NOT NULL, 
  Agenceid int NOT NULL, 
  Entityid int NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE Tracking (
  id                int IDENTITY NOT NULL, 
  activation_date   int NULL, 
  deactivation_date int NULL, 
  disabled_by       int NULL, 
  created_by        int NULL, 
  creation_date     int NULL, 
  edit_by           int NULL, 
  edition_date      int NULL, 
  PRIMARY KEY (id));
CREATE INDEX Agency_label 
  ON Agency (label);
CREATE INDEX Bill_Criteria_tax_number 
  ON Bill_Criteria (tax_number);
CREATE INDEX Group_label 
  ON [Group] (label);
CREATE INDEX Organization_label 
  ON Organization (label);
CREATE INDEX Third_Party_Invoiced_label 
  ON Third_Party_Invoiced (label);
ALTER TABLE Agency ADD CONSTRAINT FKAgency532602 FOREIGN KEY (Clientid) REFERENCES Organization (id);
ALTER TABLE City ADD CONSTRAINT FKCity243267 FOREIGN KEY (Countryid) REFERENCES Country (id);
ALTER TABLE Third_Party_Invoiced ADD CONSTRAINT FKThird_Part207670 FOREIGN KEY (Agenceid) REFERENCES Agency (id);
ALTER TABLE Organization ADD CONSTRAINT FKOrganizati335949 FOREIGN KEY (Groupeid) REFERENCES [Group] (id);
ALTER TABLE Status ADD CONSTRAINT FKStatus508439 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Document ADD CONSTRAINT FKDocument473664 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Review ADD CONSTRAINT FKReview375899 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Entity ADD CONSTRAINT FKEntity606194 FOREIGN KEY (Cityid) REFERENCES City (id);
ALTER TABLE Organization ADD CONSTRAINT FKOrganizati351673 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Agency ADD CONSTRAINT FKAgency244979 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Third_Party_Invoiced ADD CONSTRAINT FKThird_Part427559 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Entity ADD CONSTRAINT FKEntity490908 FOREIGN KEY (Default_Package_Criteriaid) REFERENCES Default_Package_Criteria (id);
ALTER TABLE [Group] ADD CONSTRAINT FKGroup184395 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Entity ADD CONSTRAINT FKEntity397140 FOREIGN KEY (Bill_Criteriaid) REFERENCES Bill_Criteria (id);
ALTER TABLE Status ADD CONSTRAINT FKStatus989010 FOREIGN KEY (Serviceid) REFERENCES Service (id);
ALTER TABLE Status ADD CONSTRAINT FKStatus789726 FOREIGN KEY (Contractid) REFERENCES Contract (id);
ALTER TABLE Entity ADD CONSTRAINT FKEntity787700 FOREIGN KEY (Trackingid) REFERENCES Tracking (id);
ALTER TABLE Service ADD CONSTRAINT FKService538690 FOREIGN KEY (Trackingid) REFERENCES Tracking (id);
ALTER TABLE Contract ADD CONSTRAINT FKContract681237 FOREIGN KEY (Trackingid) REFERENCES Tracking (id);
ALTER TABLE Service ADD CONSTRAINT FKService53642 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Contract ADD CONSTRAINT FKContract196189 FOREIGN KEY (Entityid) REFERENCES Entity (id);
ALTER TABLE Contract_Service ADD CONSTRAINT FKContract_S261258 FOREIGN KEY (Contractid) REFERENCES Contract (id);
ALTER TABLE Contract_Service ADD CONSTRAINT FKContract_S931594 FOREIGN KEY (Serviceid) REFERENCES Service (id);
ALTER TABLE Contract ADD CONSTRAINT FKContract176988 FOREIGN KEY (Tiers_Factureid) REFERENCES Third_Party_Invoiced (id);
ALTER TABLE Tax_Sequence ADD CONSTRAINT FKTax_Sequen178680 FOREIGN KEY (Agenceid) REFERENCES Agency (id);
ALTER TABLE Bill_Criteria ADD CONSTRAINT FKBill_Crite256487 FOREIGN KEY (Payment_Methodid) REFERENCES Payment_Method (id);
ALTER TABLE Contract ADD CONSTRAINT FKContract983215 FOREIGN KEY (Payment_Methodid) REFERENCES Payment_Method (id);
ALTER TABLE Contract ADD CONSTRAINT FKContract704461 FOREIGN KEY (Contact_Typeid) REFERENCES Contract_Type (id);
ALTER TABLE Service ADD CONSTRAINT FKService637667 FOREIGN KEY (Service_Typeid) REFERENCES Service_Type (id);
ALTER TABLE Entity ADD CONSTRAINT FKEntity365041 FOREIGN KEY (Languageid) REFERENCES Language (id);
