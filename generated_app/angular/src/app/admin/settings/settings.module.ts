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
      { path: '', redirectTo: 'organisme', pathMatch: 'full' },
      { path: 'affectation', loadChildren: () => import('./affectation/affectation.module').then(m => m.AffectationModule) },

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
