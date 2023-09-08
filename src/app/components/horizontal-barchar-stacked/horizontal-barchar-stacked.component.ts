import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-horizontal-barchar-stacked',
  templateUrl: './horizontal-barchar-stacked.component.html',
  styleUrls: ['./horizontal-barchar-stacked.component.scss']
})
export class HorizontalBarcharStackedComponent implements AfterViewInit{

  @Input() dataLabels: string[] = [];
  @Input() dataValuesActual: number[] = [];
  @Input() dataValuesExpected: number[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    bar: {
      datasets: {
        borderRadius: 5,
      }
    },
    scales: {
      x: {
        max: 100,
        min: 0,
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      title: {
        display: false,
      },
      subtitle: {
        display: false,
      },
      datalabels: {
        color: '#000', // Color del texto
        anchor: 'center',
        align: 'end',
        formatter: (value: any , context) => {
          if ( context.datasetIndex === 1 ) return this.dataValuesExpected[context.dataIndex] + '%';
          return value + '%'; // Esta función define el formato de las etiquetas
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabelsPlugin];

    public barChartData:  ChartData<'bar'> = {
      labels: this.dataLabels,
      datasets: [
        { 
          data: [], 
          label: 'Actual', 
          stack: 'a',
          borderRadius: 50,
          backgroundColor: '#93d5cf',
        },
        { 
          data: [], 
          label: 'Esperado', 
          stack: 'a',
          borderRadius: 50,
          backgroundColor: '#c3b3ea',
        }
      ]
    };

  constructor() { 

  }

  ngAfterViewInit(): void {
    this.barChartData.datasets[0].data = this.dataValuesActual;
    const result = this.dataValuesActual.map((value: number , index: number) => this.dataValuesExpected[index] - value);
    this.barChartData.datasets[1].data = result;
    this.barChartData.labels = this.dataLabels;
    this.chart?.update();
  }

}
