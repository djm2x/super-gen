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

export class Options {
  modules = {
    settings: ['Role'],
    mymenu: ['User']
  };

  title = 'my super app';
}

export class Role {
  id = 0;
  nom = '';
  users: User[] = [];
}