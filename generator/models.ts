export class Practitioner {
  idPractitioner = '';
  firstname = '';
  lastname = '';
  email = '';
  phone = '';
  description = '';
  password = '';

  languages: Languages[];
  active = false;
  balanceTemplates: BalanceTemplate[];
  benefits: Benefit[];
  invoices: Invoice[];
  gender: GenderEnum = GenderEnum.M;
  bookings: Booking[];
  patients: Patient[];
  families: Family[];
  histories: _History[];
  role = 'Administrateur' || 'Praticien' || 'Patient';
  legal: Legal;
  language = '';
}


export class Options {
  modules = {
    settings: ['User'],
    mymenu: ['Role']
  };
  configJson = {
    apptitle: 'GSI',
    appname: 'Gestion System Informatique',
  }
}