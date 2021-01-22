import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  template: '<router-outlet></router-outlet>',
})
export class MymenuComponent { }

/**
 * 
 */
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MymenuComponent,
    children: [
      { path: '', redirectTo: 'Role', pathMatch: 'full' },
      { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },

    ]
  },
];


@NgModule({
  declarations: [
    MymenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MymenuModule { }
