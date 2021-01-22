import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { Routes, RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: UserComponent }
];
@NgModule({
  declarations: [UserComponent, UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
  ]
})
export class UserModule { }
