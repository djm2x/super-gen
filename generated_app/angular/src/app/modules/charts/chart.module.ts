import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
     BarComponent,
     PieComponent,
    ],
  imports: [
    CommonModule,
    ChartsModule,

    MatIconModule,
  ],
  exports: [
    BarComponent,
    PieComponent,
  ]
})
export class MyChartModule { }
