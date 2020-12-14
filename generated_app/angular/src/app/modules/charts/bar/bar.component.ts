import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import * as pluginLabels from 'chartjs-plugin-labels';
import * as Chart from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: '',
      display: true,
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 16,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: false,
          labelString: '%',
          // fontSize: 20,
        },
        position: 'top',
      }]
    },
    legend: {
      position: 'top',
      // display: false,
      align: 'center',
      labels: {
        fontSize: 16,
        padding: 10,
      }
    },
    plugins: {

      labels: {
        // fontColor: ['#00000000',],
        precision: 0,
        render: 'value',
      },
      pieceLabel: {
        render: (args) => {
          const label = args.label;
          const value = args.value;
          return label + ': ' + value;
        }
      },
    }
  };

  pieChartPlugins = [
    pluginLabels,
    {
      beforeInit: (chart, options) => {
        chart.legend.afterFit = function() {
          // this.padding += 20;
          this.height += 15; // must use `function` and not => because of `this`
        };
      },
    }
  ];


  public barChartLabels: Label[] = [/*'2006', '2007', '2008', '2009', '2010', '2011', '2012'*/];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataSets[] = [ { data: [], label: '' }, ];
  public barChartLegend = true;



  public pieChartColors = [
    // { backgroundColor: ['#d17c36', '#2d71a1'], },
    { backgroundColor: '#d17c36' },
    { backgroundColor: '#7dc460' },
    { backgroundColor: '#db0707' },
    { backgroundColor: '#a19b9e' },
  ];

  title = '';
  @Input() obs = new Subject<any>();
  @Input() height = '40vh';
  @Input() col = 12;


  constructor() { }

  ngOnInit() {
    this.obs.subscribe((r) => {

      console.log(r);
      this.title = r.title;
      this.barChartLabels = r.chartLabels;
      this.barChartData = r.chartData;
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  getColors(length) {
    // tslint:disable-next-line:max-line-length
    const pallet = ['#0074D9', '#2ECC40', '#FF4136', '#FF851B', '#7FDBFF', '#B10DC9', '#FFDC00', '#001f3f', '#39CCCC', '#01FF70', '#85144b', '#F012BE', '#3D9970', '#111111', '#AAAAAA'];
    // const pallet = ['#d17c36', '#2d71a1'];
    const colors = [];

    for (let i = 0; i < length; i++) {
      colors.push(pallet[i % pallet.length]);
    }

    return colors;
  }
}
