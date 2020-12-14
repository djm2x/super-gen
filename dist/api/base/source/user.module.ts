import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User$RoutingModule } from './user-routing.module';
import { User$Component } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from 'src/app/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleModule } from '../../components/title/title.module';
import { UpdateComponent } from './update/update.component';
import { ManageFilesModule } from 'src/app/manage-files/manage-files.module';

@NgModule({
  declarations: [User$Component, UpdateComponent],
  imports: [
    CommonModule,
    User$RoutingModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    TitleModule,
    ManageFilesModule,
  ]
})
export class User$Module { }
