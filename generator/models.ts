export class Product {
  id = 0;
  tagProducts: TagProduct[] = [];
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