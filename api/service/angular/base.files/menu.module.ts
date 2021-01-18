import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  template: '<router-outlet></router-outlet>',
})
export class menuCap$Component { }

/**
 * 
 */
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: menuCap$Component,
    children: [
      { path: '', redirectTo: 'firstRoute$', pathMatch: 'full' },
      //generate
    ]
  },
];


@NgModule({
  declarations: [
    menuCap$Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class menuCap$Module { }
