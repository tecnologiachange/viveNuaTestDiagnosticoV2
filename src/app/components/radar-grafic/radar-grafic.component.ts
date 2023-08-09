import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Hability } from 'src/app/models/i.models';


@Component({
  selector: 'app-radar-grafic',
  templateUrl: './radar-grafic.component.html',
  styleUrls: ['./radar-grafic.component.scss']
})
export class RadarGraficComponent implements AfterViewInit , OnInit, OnChanges{

  @Input() habilities: Hability[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [];
  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [] , label: 'Habilidades'}
  ];

  constructor() { 
  }

  ngOnInit(): void {
    this.radarChartLabels = [];
  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.habilities.forEach((hability: Hability) => {
      this.radarChartLabels.push(hability.name);
      this.radarChartDatasets[0].data?.push(hability.percent);
    });
    this.chart?.update();
  }

  public chartClicked($event: any) { 
    console.log($event);
  }
}
