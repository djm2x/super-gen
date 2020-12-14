import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme',
  template: `
    <!-- <mat-slide-toggle #slide color="warn" [formControl]="isChecked"></mat-slide-toggle> -->

    <button mat-button [matMenuTriggerFor]="beforeMenuTheme">
      <mat-icon>palette</mat-icon>
    </button>
    <mat-menu #beforeMenuTheme="matMenu" xPosition="before">
      <mat-radio-group [formControl]="theme" class="d-flex flex-column p-2">
        <mat-radio-button *ngFor="let e of list" [value]="e.id" style="color: var(--color)">{{e.name}}</mat-radio-button>
      </mat-radio-group>
    </mat-menu>
  `,
  styles: [`

  `]
})
export class ThemeComponent implements OnInit {
  isChecked = new FormControl(false);
  theme = new FormControl('default-theme');

  list = [
    {id: 'light-theme', name: 'light'},
    {id: 'dark-theme', name: 'dark'},
  ];

  constructor(private overlayContainer: OverlayContainer, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    const theme: string = localStorage.getItem('theme') ?? this.list[0].id;
    // const isChecked: boolean = JSON.parse(localStorage.getItem('checked') ?? 'false');

    // first run
    this.theme.setValue(theme);
    setTimeout(() => {
      this.changeTheme(theme);

    }, 500);

    // on every change
    this.theme.valueChanges.subscribe((t: string) => this.changeTheme(t));
    // this.isChecked.valueChanges.subscribe((checked: boolean) => this.changeTheme(checked));
  }

  changeTheme(theme: string) {
    localStorage.setItem('theme', theme);

    // document.body.querySelector('app-root').className = theme;
    document.body.className = theme + ' mat-typography mat-app-background';
    // const body = document.body;
    // console.log(body.className)
    // if (!body.className.includes('.mat-drawer-container')) {
    //   body.classList.add('.mat-drawer-container');
    // }

    this.themeForBtnNav(theme);
  }

  // changeTheme0(checked: boolean) {
  //   localStorage.setItem('checked', JSON.stringify(checked));

  //   document.body.querySelector('app-root').className = checked ? 'dark-theme' : 'default-theme';

  //   this.themeForBtnNav(checked ? 'dark-theme' : 'default-theme');
  // }

  themeForBtnNav(theme) {
    // this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(theme);
  }
}

@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
  ],
  exports: [
    ThemeComponent
  ]
})
export class ThemeModule { }
