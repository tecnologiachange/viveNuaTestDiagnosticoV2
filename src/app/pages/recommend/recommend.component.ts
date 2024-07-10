import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { IDefinitionRecommend } from 'src/app/models/i.models';
import { Utils } from 'src/app/services/utils/utils.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';

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
  @ViewChild('modal') modal!: ModalComponent;

  public recommendCursos: any[] = [];
  public recommendHerramientas: any[] = [];

  private setRecommendCourse = new Set();
  private setRecommendGear = new Set();

  constructor(private router: Router, private location: Location  ) { 
    this.extras = (this.router.getCurrentNavigation()!.extras.state as any).extras;
    this.recommendCursos = this.extras.recommend.cursos;
    this.recommendHerramientas = this.extras.recommend.herramientas;
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
    return Utils.transformCapitalizeToString(value.name) + '<br>( Practica: '+ value.frecuency + ','+value.time + ')'; 
  }

  goBack(): void {
    this.location.back();
  }

  public createCurriculum(): void{
    this.modal.showDialog();
  }

  public close(){
    this.modal.closeDialog();
  }

  public intoCourse($event: any, item: any , course: boolean): void{
    let property: string = (course) ? 'setRecommendCourse' : 'setRecommendGear';
    let _this:any = this;
    if($event.target.checked){
      _this[property].add(item);
    } else{
      _this[property].delete(item);
    }
    console.log(Array.from(_this[property]));
  }

  public create(): void{
    this.recommendCursos = Array.from(this.setRecommendCourse);
    this.recommendHerramientas = Array.from(this.setRecommendGear);
    this.close();
  }

  public saveFollowUp(): void{
    this.router.navigateByUrl('/create-curriculum', { state: { extras: this.extras } });
  }
}
