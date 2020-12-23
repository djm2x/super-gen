import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends SuperService<Category> {

  constructor() {
    super('categorys');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, name) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${name}`);
  }

}
