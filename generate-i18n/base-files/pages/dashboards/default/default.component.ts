import { Component, OnInit } from '@angular/core';
import { ShopCustomerOrderService, OrderService, ProductService, ShopService, SessionService } from 'src/app/core/services';
import { ShopCustomerOrder, Order, Shop } from 'src/app/core/models';
import localeFr from '@angular/common/locales/fr';

import { emailSentBarChart } from './data';
import { ChartType } from 'src/app/core/models/dashboard';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Product } from 'src/app/core/models/product';
import { PictureService } from 'src/app/core/services/picture.service';
import { Picture } from 'src/app/core/models/picture';
import { startWith, take } from 'rxjs/operators';
import { DatePipe, registerLocaleData } from '@angular/common';

const IMAGE = 'assets/images/profile-img.png';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  //dasboard stat
  nbOrders: number = 0;
  revenue: number = 0;
  average: number = 0;
  emailSentBarChart: ChartType;
  data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  formData: FormGroup;

  constructor(private shopCustomerOrderService: ShopCustomerOrderService,
    private orderService: OrderService,
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private pictureService: PictureService,
    private session: SessionService,
  ) { }


  ngOnInit() {


    this.formData = this.formbuilder.group({
      products: this.formbuilder.array([])
    })

    this.emailSentBarChart = emailSentBarChart;

    this.emailSentBarChart.series = [{
      name: 'Nombre de commandes',
      data: this.data
    }];

    this.session.eventFromTopBar.pipe(startWith(0)).subscribe(r => {

      const shopId = this.session.shop.id ?? r;
      this.reset();

      // const shop = JSON.parse(sessionStorage.getItem('shop')) as Shop;
      // console.log(shop)
      this.getAllByShop(shopId);
      this.getAllByShopForDashboard(shopId);
    });




  }

  getAllByShop(shopId) {
    this.shopCustomerOrderService.getAllByShop(shopId).subscribe((shopCustomerOrders) => {

      this.nbOrders = shopCustomerOrders.length;

      let i = 0;

      shopCustomerOrders.forEach(shopCustomerOrder => {
        this.orderService.getById(shopCustomerOrder.orderId).subscribe((order) => {
          i++;
          if (order?.price) {
            this.revenue += order.price;
            this.average += order.price / i;
          }
          // const date = new Date(pipe.transform(shopCustomerOrder.date, 'short'));
          const date = new Date(shopCustomerOrder.date);

          if (date && date.getFullYear() === new Date().getFullYear()) {
            const month = date.getMonth();
            this.data[month] += 1;
            this.refreshChart();
          }
        })
      })
    })
  }

  reset() {
    this.nbOrders = 0;
    this.revenue = 0;
    this.average = 0;
    this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    (this.formData.get('products') as FormArray).clear();
  }

  getAllByShopForDashboard(shopId) {
    this.productService.getAllByShopForDashboard(shopId).subscribe((products) => {

      products.forEach(product => {
        let productsForm = this.formData.get('products') as FormArray;

        if (product.pictures.length !== 0) {
          this.pictureService.getById(product.pictures[0].id).subscribe((picture: Picture) => {
            productsForm.push(this.product(product, picture.urlTn));
          }
          );
        } else {
          productsForm.push(this.product(product, null));
        }
      })
    })
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
    }
    ]
  }

  form(): FormArray {
    return this.formData.get('products') as FormArray;
  }

  round(average) {
    return Math.round(average);
  }
}
