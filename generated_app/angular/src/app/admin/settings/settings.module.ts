import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-settings',
  template: '<router-outlet></router-outlet>',
})
export class SettingsComponent { }

/**
 * 
 */
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

    ]
  },
];


@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
