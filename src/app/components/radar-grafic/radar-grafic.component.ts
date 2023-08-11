import { AfterViewInit, Component,  EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Hability } from 'src/app/models/i.models';


@Component({
  selector: 'app-radar-grafic',
  templateUrl: './radar-grafic.component.html',
  styleUrls: ['./radar-grafic.component.scss']
})
export class RadarGraficComponent implements AfterViewInit , OnInit, OnChanges{

  @Input() habilities: Hability[] = [];
  @Output() onElementSelect: EventEmitter<Hability> = new EventEmitter<Hability>();
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
  };
  public backgroundColor : string[] = ["rgba(47, 158, 162 , 0.3)","#2f9ea2", "#9f7eee", "#5325a0", "#311868"] 
  public radarChartLabels: string[] = [];
  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    {  
      data: [] , 
      label: 'Habilidades' , 
      backgroundColor: this.backgroundColor[0], 
      borderColor: this.backgroundColor[1], 
      pointBackgroundColor: this.backgroundColor[3], 
      pointBorderColor: 'transparent', 
      pointHoverBackgroundColor: this.backgroundColor[4] , 
      pointHoverBorderColor: this.backgroundColor[4]}
  ];

  constructor() { 
  }

  ngOnInit(): void {
    this.radarChartLabels = [];
  }

  ngAfterViewInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
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
