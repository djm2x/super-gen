import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private url: string) { }

  create() {
    return this.http.get(`${this.url}/api/home/create`);
  }

  test() {
    return this.http.get(`${this.url}/api/home/test`);
  }

  uploadFile(file: FormData) {
    return this.http.post(`${this.url}/home/uploadFile`, file, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
