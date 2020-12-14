import { Component, Inject, OnInit } from '@angular/core';
import { SessionService } from '../shared';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../shared/animations';
import { MediaService } from '../shared/media.service';
import { MatDialog } from '@angular/material/dialog';
import { UowService } from '../services/uow.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [slideInAnimation],
})
export class AdminComponent implements OnInit {
  panelOpenState = false;
  isMobileWidth = false;
  actuelRoute = this.router.url;
  constructor(public session: SessionService, private router: Router
    , public myMedia: MediaService , public dialog: MatDialog
    , @Inject('BASE_URL') private url: string, public uow: UowService) { }

  ngOnInit(): void {
    this.myMedia.windowSizeChanged.subscribe(r => this.isMobileWidth = r.width <= 700);
    this.getRoute();
  }



  disconnect() {
    this.session.doSignOut();
    this.router.navigate(['']);
  }

  get profile() {
    return {
      name: this.session.user.nom,
      role: this.session.isAdmin ? 'Admin' : this.session.isUser ? 'Utilisateur' : 'Super admin',
      image: this.session.user.imageUrl,
    }
  }

  getRoute() {
    this.router.events.pipe().subscribe(route => {
      if (route instanceof NavigationStart) {
        this.actuelRoute = route.url;
        // console.log(route);
        // console.log(this.route);
      }
    });
  }

  displayImage(urlImage: string) {
    if (!urlImage) {
      return 'assets/404.jpg';
    }
    if (urlImage && urlImage.startsWith('http')) {
      return urlImage;
    }

    return `${this.url}/users/${urlImage.replace(';', '')}`;
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }

  prepareRoute(outlet: RouterOutlet) {
    return '';
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AccountComponent, {
  //     width: '750px',
  //     disableClose: true,
  //     data: { model: this.session.user, title: `` }
  //   });

  //   return dialogRef.afterClosed();
  // }

}
