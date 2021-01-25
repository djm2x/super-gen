import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InjectService } from '../inject.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  protected http = InjectService.injector.get(HttpClient);

  items = this.http.get<Config>(`assets/json/configs.json`);

  constructor() { }
}

export class Config {
  apptitle = '';
  appname = '';
}
