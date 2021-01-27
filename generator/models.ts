export class User {
  id = 0;
  firstname = '';
  lastname = '';
  phone = '';
  email = '';
  password = '';

  username = '';
  ExternalId = null;
  languageId = 0;
  language: Language;

  roleId = 0;
  role: Role;
}

export class Role {
  id = 0;
  value= '';

}


export class Language {
  id = 0;
  value= '';
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