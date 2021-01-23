import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectService } from '../inject.service';

export class SuperService<T> {

  protected http = InjectService.injector.get(HttpClient);
  protected urlApi: string = InjectService.injector.get('API_URL');
  protected url: string = InjectService.injector.get('BASE_URL');

  constructor(public controller: string) { }

  getList(startIndex, pageSize, sortBy, sortDir) {
    return this.http.get<{ list: T[], count: number }>
      (`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}`);
  }

  get = () => this.http.get<T[]>(`${this.urlApi}/${this.controller}/get`);

  count = () => this.http.get<number>(`${this.urlApi}/${this.controller}/count`);

  getOne = (id) => this.http.get<T>(`${this.urlApi}/${this.controller}/get/${id}`);

  post = (o: T) => this.http.post<T>(`${this.urlApi}/${this.controller}/post`, o);

  put = (id: number | string, o: T) => this.http.put<any>(`${this.urlApi}/${this.controller}/put/${id}`, o);

  /**
   * Exemple
   * const model = [ { op: "replace", path: "/email", value: obj.email }];
   */
  patch(id: number, model: { op: string, path: string, value: any }[]) {
    return this.http.patch<T>(`${this.urlApi}/${this.controller}/patch/${id}`, model);
  }

  delete = (id) => this.http.delete<any>(`${this.urlApi}/${this.controller}/delete/${id}`);

  updateRange(o: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/updateRange`, o);
  }

  deleteRange(o: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/deleteRange`, o);
  }

  deleteRangeByIds(ids: number[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/deleteRangeByIds`, ids);
  }

  postRange(o: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/postRange`, o);
  }

  autocomplete(column: string, name: string) {
    return this.http.get(`${this.urlApi}/${this.controller}/autocomplete/${column}/${name}`);
  }

  getByForeignkey(id) {
    return this.http.get<T[]>(`${this.urlApi}/${this.controller}/getByForeignkey/${id}`);
  }
}

