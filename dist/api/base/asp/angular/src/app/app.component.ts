import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    // this.getRoute();

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
