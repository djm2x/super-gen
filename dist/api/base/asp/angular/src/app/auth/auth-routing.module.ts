import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { CreateComponent } from './create/create.component';
import { AuthComponent } from './auth.component';



const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      // { path: '**', redirectTo: 'home', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      // { path: 'create', component: CreateComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
