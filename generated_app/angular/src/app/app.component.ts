import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UowService } from './services/uow.service';
import { SplashScreenService } from './shared/splash-screen.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  route = this.router.url;
  constructor(private splashScreenService: SplashScreenService, @Inject(DOCUMENT) private document: Document
  , public uow: UowService, private router: Router) { }

  async ngOnInit() {
    const items = await this.uow.config.items.toPromise();
    this.document.head.querySelector('title').innerHTML = items.apptitle;
    this.document.body.querySelector('#appname').innerHTML = items.appname;

    this.getRoute();
    this.saveRoute();
  }

  getRoute() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart && route.url !== '/') {
        this.route = route.url;
        this.saveRoute();
      }
    });
  }

  saveRoute() {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : ', this.route);
    if (!this.route.includes('auth')) {
      localStorage.setItem('route', this.route);
    }
  }
}
