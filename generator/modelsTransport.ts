export class Agency {
  id = 0
  label = '';
  Organization_id = 0;

  super_entity = new SuperEntity();
  organization = new Organization();
  taxSequences: TaxSequence[] = [];
  thirdPartyInvoiceds: ThirdPartyInvoiced[] = [];

}

export class BillCriteria {
  id = 0;
  taxNumber = '';
  taxCode = '';
  effectiveDate = new Date();
  settlementBillPeriod = 0;
  billFrequency = 0;
  payment_method_id = 0;
  paymentMethod = new PaymentMethod();

  entities: SuperEntity[] = [];

}

export class UpdateToValidate {
  id = 0;
  table_name = '';
  object_id = 0;
  object_name = '';
  old_value = '';
  new_value = '';
  type_of_value = '';
  status = '';
  comment = '';
  creation_date = new Date();
  created_by = 0;
  update_date = new Date();
  updated_by = 0;

  document_id = 0;
  document = new Document();
}
export class City {
  id = 0;
  name = '';
  code = '';
  country_id = 0;

  country = new Country();
  entities: SuperEntity[] = [];
}

export class Country {
  id = 0;
  name = '';
  code = '';

  cities: City[] = [];
}

export class Contract {
  id = 0;
  code = 0;
  label = 0;
  settlementPeriod = 0;
  startDate = new Date();
  endDate = new Date();
  comment = '';
  salesid = 0;
  trackingid = 0;
  super_entityid = 0;
  third_party_invoiced_id = 0;
  payment_method_id = 0;
  contract_type_id = 0;

  tracking = new Tracking();
  super_entity = new SuperEntity();
  thirdPartyInvoiced = new ThirdPartyInvoiced();
  paymentMethod = new PaymentMethod();
  contractType = new ContractType();
  statuses: Status[] = [];
  contractService: ContractService[] = [];
}

export class ContractService {
  id = 0;
  contract_id = 0;
  service_id = 0;

  contract = new Contract();
  service = new Service();
}

export class ContractType {
  id = 0;
  name = '';

}

export class Organization {
  id = 0;
  label = '';
  group_id = 0;

  group = new Group();
  super_entity = new SuperEntity();

  agencies: Agency[] = [];
}

export class DefaultPackageCriteria {
  id = 0;
  unitVolume = 0;
  unitWeight = 0;
  packagesNumber = 0;
  entities: SuperEntity[] = [];
}

export class Document {
  id = 0;
  name = '';
  createdBy = 0;
  creationDate = new Date();
  path = '';
  super_entity_id = 0;
  super_entity = new SuperEntity();

  updateToValidates: UpdateToValidate[] = [];
}

export class Group {
  id = 0;
  label = '';
  super_entity = new SuperEntity();
  organizations: Organization[] = [];
}

export class Service {
  id = 0;
  code = 0;
  label = 0;
  startDate = new Date();
  endDate = new Date();
  description = '';
  tracking_id = 0;
  super_entity_id = 0;
  service_type_id = 0;

  tracking = new Tracking();
  super_entity = new SuperEntity();
  serviceType = new ServiceType();

  statuses: Status[] = [];
  contractServices: ContractService[] = [];
}

export class ServiceType {
  id = 0;
  name = '';
  services: Service[] = [];
}

export class Status {
  id = 0;
  label = '';
  user_id = 0;
  creationDate = new Date();
  super_entity_id = 0;
  service_id = 0;
  contract_id = 0;

  super_entity = new SuperEntity();
  service = new Service();
  contract = new Contract();
}

export class TaxSequence {
  id = 0;
  number = 0;
  code = '';
  agency_id = 0;
  agency = new Agency();
}

export class SuperEntity {
  id = 0;
  code = '';
  label = '';
  name = '';
  logoUrl = '';
  address = '';
  zipCode = '';
  phone = '';
  fax = '';
  email = '';
  type = '';
  isBillable = false;

  city_id = 0;
  default_package_criteriaid = 0;
  bill_criteriaid = 0;
  tracking_id = 0;
  language_id = 0;

  city = new City();
  defaultPackageCriteria = new DefaultPackageCriteria();
  billCriteria = new BillCriteria();
  tracking = new Tracking();
  language = new Language();

  // groups: Group[] = [];
  // organizations: Organization[] = [];
  // agencies: Agency[] = [];
  // thirdPartyInvoiceds: ThirdPartyInvoiced[] = [];

  group_id = 0;
  organization_id = 0;
  agency_id = 0;
  thirdPartyInvoiced_id = 0;

  group = new Group();
  organization = new Organization();
  agency = new Agency();
  thirdPartyInvoiced = new ThirdPartyInvoiced();

  documents: Document[] = [];
  reviews: Review[] = [];
  services: Service[] = [];
  statuses: Status[] = [];
}

export class ThirdPartyInvoiced {
  id = 0;
  label = 0;
  agence_id = 0;

  agency = new Agency();
  super_entity = new SuperEntity();
}

export class Tracking {
  id = 0;
  activationDate = 0;
  deactivationDate = 0;
  disabledBy = 0;
  createdBy = 0;
  creationDate = 0;
  editBy = 0;
  editionDate = 0;

  contracts: Contract[] = [];
  entities: SuperEntity[] = [];
  services: Service[] = [];
}

export class PaymentMethod {
  id = 0;
  name = '';
  billCriterias: BillCriteria[] = [];
  contracts: Contract[] = [];
}


export class Review {
  id = 0;
  score = 0;
  comment = '';
  creationDate = 0;
  user_id = 0;
  super_entity_id = 0;
  entitie = new SuperEntity();
}

export class Language {
  id = 0;
  name = '';
  entities: SuperEntity[] = [];
}

export class User {
  id = 0;
  email = '';
  role = '';
}
