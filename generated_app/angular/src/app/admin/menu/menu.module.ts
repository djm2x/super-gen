import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
//
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RoleComponent } from './role/role.component';

@Component({
  selector: 'app-menu',
  template: '<router-outlet></router-outlet>',
})
export class MenuComponent { }


@NgModule({
  declarations: [
    MenuComponent,
    RoleComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    //
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatToolbarModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class MenuModule { }
