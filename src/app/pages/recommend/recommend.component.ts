import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { IDefinitionRecommend } from 'src/app/models/i.models';
import { Utils } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit{

  public extras;
  public dataLabels: string[] = [];
  public dataValuesActual: number[] = [];
  public dataValuesExpected: number[] = [];

  constructor(private router: Router, private location: Location  ) { 
    this.extras = (this.router.getCurrentNavigation()!.extras.state as any).extras;
  }

  ngOnInit(): void {
    this.find();
  }

  public find(): void{
    this.extras.recommend.habilidades.forEach((item: any) => {
      const _element = this.extras.results.find( (element: any) => Utils.standartText(element.name) == Utils.standartText(item.name));
      this.dataLabels.push(item.name);
      const valueActual = Utils.getNumberByOneDecimal( _element.percent)
      this.dataValuesActual.push( valueActual );
      this.dataValuesExpected.push((item.value >= valueActual) ? item.value : valueActual);
    });
  }

  public getValue( value: string | IDefinitionRecommend , isExtend: boolean = false): string{
    if (typeof value == 'string') return value;
    if (!isExtend) return value.name;
    return value.name + '<br>'+ value.frecuency + '<br>'+value.time; 
  }

  goBack(): void {
    this.location.back();
  }
}
