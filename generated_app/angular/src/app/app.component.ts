import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UowService } from './services/uow.service';
import { SplashScreenService } from './shared/splash-screen.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private splashScreenService: SplashScreenService, @Inject(DOCUMENT) private document: Document
  , public uow: UowService) { }

  async ngOnInit() {
    const items = await this.uow.config.items.toPromise();
    this.document.head.querySelector('title').innerHTML = items.apptitle;
    this.document.body.querySelector('#appname').innerHTML = items.appname;
  }

  // get patchRoute() { return this.route.split('/'); }

  // getRoute() {
  //   this.router.events.subscribe(route => {
  //     if (route instanceof NavigationStart) {
  //       this.route = route.url;
  //       console.log(this.route);
  //     }
  //   });
  // }
}
