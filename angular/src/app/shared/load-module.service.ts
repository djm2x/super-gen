import { Injectable, Component, Inject } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadModuleService {
  public isShowingRouteLoadIndicator: boolean;
  constructor(private router: Router) { }

  loadModule() {

    this.isShowingRouteLoadIndicator = false;
    let asyncLoadCount = 0;
    this.router.events.subscribe(
      (event: RouterEvent): void => {

        if (event instanceof RouteConfigLoadStart) {
          if (event.route.path === 'recette') {
            asyncLoadCount--;
          }
          // console.log(event);
        } else if (event instanceof RouteConfigLoadEnd) {
          if (event.route.path === 'recette') {
            asyncLoadCount--;
          }
        }

        this.isShowingRouteLoadIndicator = !!asyncLoadCount;
      }
    );
  }
}
