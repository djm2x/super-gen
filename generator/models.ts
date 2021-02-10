export class Product {
  id = 0;
  blockId = 0;
  block = new Block();

  tagId = 0;
  tag = new Tag();
}

export class Block {
  id = 0;
  name = 0;
  shopId = 0;
  products: Product[] = [];
}

export class Tag {
  id = 0;
  name = 0;
  color = '';
  shopId = 0;
  blockId = 0;
  products: Product[] = [];
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