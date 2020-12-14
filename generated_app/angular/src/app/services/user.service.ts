import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<User> {

  constructor() {
    super('users');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, nom, email, profil, idRole, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${nom}/${email}/${profil}/${idRole}`);
  }

  getAllForStatistique(nom, email, profil, idRole, ) {
    return this.http.get(`${this.urlApi}/${this.controller}/getAllForStatistique/${nom}/${email}/${profil}/${idRole}`);
  }

}
