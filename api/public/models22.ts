// export class User {
//   id = 0;
//   nom = '';
//   prenom = '';
//   email = '';
//   password = '';
//   phone = '';
//   isActive = false;
//   matricule = '';
//   profil = '';
//   imageUrl = '';
// }

export class User {
  id = 0;
  nom = '';
  email = '';
  password = '';
  isActive = false;
  imageUrl = '';
  profil = '';

  idRole = 0;
  role = new Role();
}

export class Role {
  id = 0;
  name = '';
  users: User[] = [];
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
