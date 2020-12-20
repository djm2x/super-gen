import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.module';
import { RoleComponent } from './role/role.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: 'role', pathMatch: 'full' },
      { path: 'role', component: RoleComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
