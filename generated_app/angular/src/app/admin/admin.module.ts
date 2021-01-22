import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
{ path: 'mymenu', loadChildren: () => import('./mymenu/mymenu.module').then(m => m.MymenuModule) },

    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
  ]
})
export class AdminModule { }
