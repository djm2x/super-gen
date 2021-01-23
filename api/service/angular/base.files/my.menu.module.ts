import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

export interface IItems extends Array<{ name: string, route?: string, items: IItems }> { }

@Component({
  selector: 'app-menu',
  template: `
  <ng-container *ngFor="let e of items">
    <!-- Handle main menu items here -->
    <ng-container *ngIf="e.items.length > 0">
      <button mat-button [matMenuTriggerFor]="menu.buildMenu">
        {{e.name}}
      </button>
      <app-sub-menu #menu [items]="e.items"></app-sub-menu>
    </ng-container>
    <!-- Leaf sub menu items here -->
    <ng-container *ngIf="e.items.length === 0">
      <button mat-button color="primary" [routerLink]="e.name">
        {{e.name}}
      </button>
    </ng-container>
  </ng-container>
`,
  styles: ['']
})
export class MenuComponent {

  items: IItems = //=valueItems;
}

/**
 * Sub menu
 */
@Component({
  selector: 'app-sub-menu',
  template: `
  <mat-menu #buildMenu="matMenu" [overlapTrigger]="false">
  <ng-container *ngFor="let e of items">
    <!-- Handle main menu items -->
    <ng-container *ngIf="e.items.length > 0">
      <button mat-menu-item color="primary" [matMenuTriggerFor]="menu.buildMenu">
        {{e.name}}
      </button>
      <app-sub-menu #menu [items]="e.items"></app-sub-menu>
    </ng-container>
    <!-- Handle sub menu items -->
    <ng-container *ngIf="e.items.length === 0">
      <button mat-menu-item [routerLink]="e.route">
        {{e.name}}
      </button>
    </ng-container>
  </ng-container>
</mat-menu>
  `,
  styles: ['']
})
export class SubMenuComponent {
  @Input() items: IItems;
  @ViewChild('buildMenu', { static: true }) public buildMenu;
}

/**
 * Module
 */
@NgModule({
  declarations: [
    MenuComponent,
    SubMenuComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [MenuComponent]
})
export class MyMenuModule { }
