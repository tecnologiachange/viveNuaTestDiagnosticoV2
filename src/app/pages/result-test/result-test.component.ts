import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routeTransitionAnimations } from '../animations';
import { Hability, Subhability } from 'src/app/models/i.models';
import { Utils } from 'src/app/services/utils/utils.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HttpService } from 'src/app/services/api/http.service';


@Component({
  selector: 'app-result-test',
  templateUrl: './result-test.component.html',
  styleUrls: ['./result-test.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ResultTestComponent implements OnInit{

  public name: string = '';
  public email: string = '';
  public sectionsColors = [ "#2f9ea2", "#9f7eee", "#5325a0", "#311868" ];
  public percent = 50;
  public results: Hability[] = [];
  public id: string = '';
  public item: Hability = {} as Hability;
  public burnout: Hability= { name: 'Burnout' , percent: 0 , subhabilities: [] , description: '' , isGraphic: false} as Hability;
  public financieras: Hability = {} as Hability;
  public fisicas: Hability = {} as Hability;
  @ViewChild('modal') modal!: ModalComponent;
  public isLoad = false;
  public extras!: any ;
  public subhabilidades: Subhability[] = [];

  constructor( private router: Router ,  private http: HttpService) { 
    this.extras = this.router.getCurrentNavigation()!.extras.state;
  }

  ngOnInit(): void {
    this.results = this.extras.results;
    this.name = this.extras.name;
    this.email = this.extras.email;
    this.burnout = this.extras.burnout;
    this.financieras = this.extras.financieras;
    this.fisicas = this.extras.fisicas;
    this.id = this.extras.id;
    this.subhabilidades = this.extras.subhabilities;
    this.burnout.name = '';
  }

  public sendEmit(_item: any){
    this.item = _item;
    if( Utils.isDevice() ){
      this.router.navigateByUrl ('/detail', { state: { id:this.id , _item: this.item} ,  });
    } else {
      this.modal.showDialog();
    }
  }

  public mySubhabilities(): void {
    this.router.navigateByUrl ('/subhabilities', { state: { sub: this.subhabilidades , name: this.name } } );
  }

  public close(){
    this.modal.closeDialog();
  }

  public sendMail(){
    const body = {
      email: this.email, 
      name: this.name,
      reportId: this.id
    }
    this.http.post(body).subscribe( res => console.log(res));
  }

  public sendSubscription(){
    window.open('https://www.vivenua.com/producto' , '_blank');
  }

  public isCurriculum(): boolean{
    return !( 
      this.extras.recommend.cursos.length === 0 || 
      this.extras.recommend.habilidades.length === 0 || 
      this.extras.recommend.herramientas.length === 0 
      );
  }

  public nextPage(): void {
    console.log(this.extras);
    this.router.navigateByUrl('/recommend', { state: { extras: this.extras } });
  }
}
