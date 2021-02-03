import { Component, OnInit } from '@angular/core';
import { ShopCustomerOrderService, OrderService, ProductService, ShopService, SessionService } from 'src/app/core/services';
import { ShopCustomerOrder, Order, Shop, Partner } from 'src/app/core/models';
import localeFr from '@angular/common/locales/fr';

import { emailSentBarChart } from './data';
import { ChartType } from 'src/app/core/models/dashboard';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Product } from 'src/app/core/models/product';
import { PictureService } from 'src/app/core/services/picture.service';
import { Picture } from 'src/app/core/models/picture';
import { startWith, take } from 'rxjs/operators';
import { DatePipe, registerLocaleData } from '@angular/common';
import { UowService } from 'src/app/core/services/uow.service';
import { displayImage } from 'src/environments/environment';

const IMAGE = 'assets/images/profile-img.png';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  displayImage = displayImage;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  //dasboard stat
  nbOrders: number = 0;
  revenue: number = 0;
  average: number = 0;
  emailSentBarChart: ChartType;
  data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  formData: FormGroup;

  constructor(private formbuilder: FormBuilder, public session: SessionService, private uow: UowService,) { }

  ngOnInit() {
    this.formData = this.formbuilder.group({
      products: this.formbuilder.array([])
    })

    this.emailSentBarChart = emailSentBarChart;

    this.emailSentBarChart.series = [{
      name: 'Nombre de commandes',
      data: this.data
    }];

    this.session.eventFromTopBar.pipe(startWith(0)).subscribe(async r => {

      const shopId = this.session.shop.id ?? r;
      this.reset();

      if (this.session.isPartner) {
        // get products
        await this.getAllByPartnerId(this.session.partner)
      } else {
        this.getAllByShop(shopId);
        // get products
        this.getAllByShopForDashboard(shopId);
      }
    });
  }

  async getAllByPartnerId(partner: Partner) {
    // 1 get products
    const products = await this.uow.products.getAllByPartnerId(partner.id).toPromise();

    const productsForm = this.formData.get('products') as FormArray;

    products.map(e => this.product(e, e?.pictures[0]?.urlTn)).map(e => productsForm.push(e));

    // 2 get specific product from shopCustomerOrders
    const shops: Shop[] = (partner as any)?.shops;

    const shopCustomerOrders = await this.uow.shopCustomerOrders.getAllByPartner(partner.id, shops.map(e => e.id).join(';')).toPromise();

    shopCustomerOrders.forEach((shopCustomerOrder, i) => {

      let productsInCart = shopCustomerOrder.order.cart.productVariantCarts
        .map(c => {
          let p: Product = null;
          try {
            p = JSON.parse(c.product);
          } catch (error) { }

          return p;
        })
        .filter(e => e !== null && e !== undefined)
        ;

      //obtain the product equivalent to that on products (filterd bu patener and crategory brand)
      productsInCart = productsInCart.filter(p => products.map(p => p.id).includes(p.id));

      productsInCart.map(e => {
        this.calculeChartData(e, shopCustomerOrder.order.orderDate, i);
      });

      this.nbOrders = productsInCart.length;
    })
  }

  getAllByShop(shopId) {
    this.uow.shopCustomerOrders.getAllByShop(shopId).subscribe((shopCustomerOrders) => {

      this.nbOrders = shopCustomerOrders.length;

      shopCustomerOrders.forEach((shopCustomerOrder, i) => {
        this.calculeChartData(shopCustomerOrder.order, shopCustomerOrder.date, i)
      })
    })
  }

  getAllByShopForDashboard(shopId) {
    this.uow.products.getAllByShopForDashboard(shopId).subscribe((products) => {

      let productsForm = this.formData.get('products') as FormArray;
      products.map(e => this.product(e, e?.pictures[0]?.urlTn)).map(e => productsForm.push(e))
    })
  }

  calculeChartData(e: Order | Product, dateAchat: Date, i: number) {
    if (e?.price) {
      this.revenue += e.price;
      this.average += e.price / (i + 1);
    }
    const date = new Date(dateAchat);

    if (date && date.getFullYear() === new Date().getFullYear()) {
      const month = date.getMonth();
      this.data[month] += 1;
      this.refreshChart();
    }
  }

  reset() {
    this.nbOrders = 0;
    this.revenue = 0;
    this.average = 0;
    this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    (this.formData.get('products') as FormArray).clear();
  }

  imgError(img: any) {
    img.src = IMAGE;
  }


  product(product: Product, imageURL): FormGroup {
    return this.formbuilder.group({
      product: this.formbuilder.group({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        stock: product?.stock,
        saleCount: product?.saleCount,
        imageURL: imageURL
      })
    })
  }

  refreshChart() {
    this.emailSentBarChart.series = [{
      name: 'Nombre de commandes',
      data: this.data
    }]
  }

  form(): FormArray {
    return this.formData.get('products') as FormArray;
  }

  round(average) {
    return Math.round(average);
  }
}
