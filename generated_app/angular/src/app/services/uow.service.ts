
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ConfigService } from './config.service';
import { OrganismeService } from './organisme.service';
import { SiteService } from './site.service';
import { EntiteService } from './entite.service';
import { CategorieService } from './categorie.service';
import { UserService } from './user.service';
import { CollaborateurService } from './collaborateur.service';
import { FonctionService } from './fonction.service';
import { AffectationService } from './affectation.service';
import { ConstructeurService } from './constructeur.service';
import { FamilleService } from './famille.service';
import { ArticleService } from './article.service';
import { FournisseurService } from './fournisseur.service';
import { ReceptionService } from './reception.service';
import { DetailsReceptionService } from './detailsReception.service';
import { FormatEmballageService } from './formatEmballage.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
  config = new ConfigService();
  accounts = new AccountService();
  organismes = new OrganismeService();
sites = new SiteService();
entites = new EntiteService();
categories = new CategorieService();
users = new UserService();
collaborateurs = new CollaborateurService();
fonctions = new FonctionService();
affectations = new AffectationService();
constructeurs = new ConstructeurService();
familles = new FamilleService();
articles = new ArticleService();
fournisseurs = new FournisseurService();
receptions = new ReceptionService();
detailsReceptions = new DetailsReceptionService();
formatEmballages = new FormatEmballageService();

  
  years = [...Array(new Date().getFullYear() - 2015).keys()].map(e => 2015 + e + 1);
  months = [...Array(12).keys()].map(e => e + 1);
  monthsAlpha = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((e, i) => ({ id: i + 1, name: e }));
  
  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }

  arrayToString(t: string[]) {
    return t.map(e => `${e};`).reduce((p, c) => p + c);
  }

  stringToArray(s: string): string[] {
    const t = s.split(';');

    t.pop();

    return t;
  }
}
