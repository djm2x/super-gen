import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), },
  { path: 'copie', loadChildren: () => import('./copie/home.module').then(m => m.HomeModule), },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
    // {
    //   preloadingStrategy: PreloadAllModules
    // }
    ),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
