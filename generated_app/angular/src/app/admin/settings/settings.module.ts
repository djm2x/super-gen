import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-settings',
  template: '<router-outlet></router-outlet>',
})
export class SettingsComponent { }

/**
 * 
 */
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'organisme', pathMatch: 'full' },
      { path: 'organisme', loadChildren: () => import('./organisme/organisme.module').then(m => m.OrganismeModule) },
{ path: 'site', loadChildren: () => import('./site/site.module').then(m => m.SiteModule) },
{ path: 'entite', loadChildren: () => import('./entite/entite.module').then(m => m.EntiteModule) },
{ path: 'categorie', loadChildren: () => import('./categorie/categorie.module').then(m => m.CategorieModule) },
{ path: 'collaborateur', loadChildren: () => import('./collaborateur/collaborateur.module').then(m => m.CollaborateurModule) },
{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
{ path: 'fonction', loadChildren: () => import('./fonction/fonction.module').then(m => m.FonctionModule) },
{ path: 'affectation', loadChildren: () => import('./affectation/affectation.module').then(m => m.AffectationModule) },

    ]
  },
];


@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
