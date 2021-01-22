import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
/*{imports}*/

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canActivate: [AdminGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
