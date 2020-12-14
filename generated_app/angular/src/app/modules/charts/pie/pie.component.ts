import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, BaseChartDirective } from 'ng2-charts';
import { Subject } from 'rxjs';
import * as pluginLabels from 'chartjs-plugin-labels';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input() obs = new Subject<any>();
  @Output() eventToParent = new Subject<any>();
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;
  @Input() withGraphe = '100%';
  @Input() height = '50vh';
  title = '';

  // Pie
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutoutPercentage: 50,
    tooltips: {
      enabled: true,
      // callbacks: {
      //   label: (tooltipItem, data) => {
      //     const dataLabel = data.labels[tooltipItem.index] as string[];;
      //     const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as number;

      //     // console.log(dataLabel, value)

      //     return dataLabel + ' ' + (value / 60).toFixed(2);
      //   }
      // }
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      onHover: (e, item) => { }
    },
    // onClick: (e, a) => {
    //   console.log(a)
    // },
    legend: {
      position: 'bottom',
      // position: 'right',
      display: true,
      align: 'center',
      labels: {
        fontSize: 16,
      }
    },
    plugins: {
      labels: {
        fontColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',],
        precision: 0,
        fontSize: 14,
        fontStyle: 'bold',
        render: 'percentage',
        // render: (args, i) => {
        //   const label = args.label;
        //   const value = args.value;

        //   return `${value} % / (${this.dataToShowInTable[args.index]}) `;
        // }
        onClick: (a) => {
          console.log(a)
        },
      },
      pieceLabel: {
        // fontColor: '#000',
        render: (args) => {
          const label = args.label;
          const value = args.value;
          return label + ': ' + value;
        }
      },
      beforeInit: (chart, options) => {
        console.log(chart, options)
        this.chartOptions.title.text = this.title;
      }
    }


  };


  @Input() public pieChartType: ChartType = 'pie';
  public pieChartLabels: Label[] = [];
  pieChartData: SingleDataSet = [];


  public pieChartLegend = true;
  public pieChartPlugins = [pluginLabels];
  public pieChartColors = [
    { backgroundColor: [], },
  ];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.obs.subscribe(r => {
      this.title = r.title;
      // this.baseChart.chart.update();
      this.pieChartLabels = r.chartLabels;
      this.pieChartData = r.chartData;



      this.pieChartColors[0].backgroundColor = this.getColors(this.pieChartLabels.length);


    });

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: Array<{}> | any }): void {
    if (active.length > 0) {
      const chart = active[0]._chart as Chart;
      const activePoints: any = chart.getElementAtEvent(event);

      if (activePoints.length > 0) {

        const i = +activePoints[0]._index;
        const label = chart.data.labels[i].toString();
        const data = this.pieChartData[i] as number;
        // const data = chart.data.datasets[clickedElementIndex];

        this.eventToParent.next({ i, label, data });
      }
    }
  }

  getColors(length) {
    // tslint:disable-next-line:max-line-length
    const pallet = [
      '#2b8855',
      '#f78a21',
      '#cd2330',
      '#d97f2a', // orange
      '#2d71a1', // blue
      '#c2c3c6', // gray
      '#ba6446',
      '#7dc460', // green
      '#fdb93a',
      '#59b8ce',
      '#5c5c5f',
      '#ef4f42',
      '#a5a6aa',
      // '#85144b', a31414
      // '#F012BE',
      // '#3D9970',
      // '#111111',
      // '#AAAAAA',
    ];
    // const pallet = ['#d17c36', '#496488', '#84bc5b'];
    const colors = [];

    for (let i = 0; i < length; i++) {
      colors.push(pallet[i % pallet.length]);
    }

    return colors;
  }
}
