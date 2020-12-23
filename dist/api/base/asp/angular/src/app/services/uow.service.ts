
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { BlogService } from './blog.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
  accounts = new AccountService();
  users = new UserService();
roles = new RoleService();
blogs = new BlogService();
categorys = new CategoryService();

  

  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }
}
