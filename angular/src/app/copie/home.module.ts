import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from '../mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { ManageFilesModule } from '../manage-files/manage-files.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    ManageFilesModule,
  ]
})
export class HomeModule { }
