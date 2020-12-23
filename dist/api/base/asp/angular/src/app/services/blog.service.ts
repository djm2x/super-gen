import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Blog } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends SuperService<Blog> {

  constructor() {
    super('blogs');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, title, idUser, idCategory) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${title}/${idUser}/${idCategory}`);
  }

}
