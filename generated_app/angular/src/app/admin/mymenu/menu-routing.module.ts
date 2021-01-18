import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { menuCap$Component } from './menuLower$.module';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: menuCap$Component,
    children: [
      { path: '', redirectTo: 'role', pathMatch: 'full' },
      /*{generate},*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class menuCap$RoutingModule { }
