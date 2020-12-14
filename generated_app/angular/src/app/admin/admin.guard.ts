import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log()
    if (this.session.isUser) {
      this.router.navigate(['/admin/pointage']);
      return false;
    }

    if (this.session.isAdmin) {
      this.router.navigate(['/admin/rapports']);
      return false;
    }


    return true;
  }
}
