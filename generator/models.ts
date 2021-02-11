export class Mouvement {
  id = 0;
  idArticle = 0;
  article = new Article()

  idEmplacement = 0;
  emplacement = new Emplacement()

  idCollaborateur = 0;
  collaborateur = new Collaborateur()

  date = new Date();
  note = '';
}

export class TagProduct {
  tagId = 0;
  productId = 0;
  tag = new Tag();
  product = new Product();
}

export class Tag {
  id = 0;
  name = '';
  color = '';
  shopId = 0;
  tagProducts: TagProduct[] = [];
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