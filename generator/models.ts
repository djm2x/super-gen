export class CustomerProduct {
  customerId = 0;
  productId = 0;
  customer = new Customer();
  product = new Product();
}

export class Customer {
  id = 0;
  email = '';
  subscriptionDate = new Date();
  cashback = 0;

  //cart:Cart;

  addresses: Array<_Address>;
  shopCustomerOrders: ShopCustomerOrder[] = [];//Migration
  products: Product[] = [];//Migration
  reviews: Review[] = [];//Migration maybe
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