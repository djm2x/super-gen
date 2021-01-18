import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuCap$RoutingModule } from './menuLower$-routing.module';
import { RoleComponent } from './role/role.component';
import { MatModule } from 'src/app/mat.module';

@Component({
  selector: 'app-menu',
  template: '<router-outlet></router-outlet>',
})
export class menuCap$Component { }


@NgModule({
  declarations: [
    menuCap$Component,
    RoleComponent,
  ],
  imports: [
    CommonModule,
    menuCap$RoutingModule,
    MatModule,
  ]
})
export class menuCap$Module { }
