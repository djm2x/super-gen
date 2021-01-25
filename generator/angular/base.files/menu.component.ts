import { Component, Input, ViewChild } from '@angular/core';
import { IItems } from './ichild.interface';

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

  items: IItems /*=valueItems*/;
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
