import { AfterViewInit, Component,  EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Hability } from 'src/app/models/i.models';


@Component({
  selector: 'app-radar-grafic',
  templateUrl: './radar-grafic.component.html',
  styleUrls: ['./radar-grafic.component.scss']
})
export class RadarGraficComponent implements AfterViewInit , OnInit{

  @Input() habilities: Hability[] = [];
  @Output() onElementSelect: EventEmitter<Hability> = new EventEmitter<Hability>();
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
    scales:{
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        }
      },
    },
    maintainAspectRatio: false,
    font : {
      size: 24,
      family: 'Raleway',
      weight: '600'
    },
    layout:{
      autoPadding: false,
      padding: 1
    },
    normalized: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        font : {
          family: 'Raleway',
          size: 24,
          weight: 'bold'
        }
      }
    }
  };
  public backgroundColor : string[] = ["rgba(47, 158, 162 , 0.2)","#2f9ea2", "#9f7eee", "#5325a0", "#311868"] 
  public radarChartLabels: string[] = [];
  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    {  
      data: [] , 
      label: 'Habilidades' ,
      backgroundColor: 'rgba(146, 213, 206, 0.4)',//this.backgroundColor[0], 
      borderColor: 'transparent', //this.backgroundColor[1], 
      pointBackgroundColor: this.backgroundColor[3], 
      pointBorderColor: 'transparent', 
      pointHoverBackgroundColor: this.backgroundColor[4] , 
      pointHoverBorderColor: this.backgroundColor[4],
      
    }
  ];

  constructor() { 
  }

  ngOnInit(): void {
    this.radarChartLabels = [];
  }

  ngAfterViewInit(): void {
    this.radarChartLabels = [];
    this.radarChartDatasets[0].data = [];
    this.habilities.forEach((hability: Hability) => {
        this.radarChartLabels.push(hability.name);
        this.radarChartDatasets[0].data?.push(hability.percent *100);
    });
    this.chart?.update(); 
  }

  public chartClicked($event: any) { 
    this.onElementSelect.emit(this.habilities[$event.active[0].index]);
  }
}
