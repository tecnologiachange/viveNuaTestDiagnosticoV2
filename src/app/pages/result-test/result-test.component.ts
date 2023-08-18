import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routeTransitionAnimations } from '../animations';
import { ProcessService } from 'src/app/services/proccess/process.service';
import { Hability } from 'src/app/models/i.models';
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
  public resultsEspecific: Hability[] = [];
  public id: string = '';
  public item: Hability = {} as Hability;
  public burnout: Hability= { name: 'Burnout' , percent: 0 , subhabilities: [] , description: '' , isGraphic: false} as Hability;
  public financieras: Hability = {} as Hability;
  public fisicas: Hability = {} as Hability;
  @ViewChild('modal') modal!: ModalComponent;
  public isLoad = false;

  constructor(private route: ActivatedRoute, private router: Router , private process: ProcessService, private http: HttpService) { }

  ngOnInit(): void {
    this.isLoad = true;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.process.get(this.id).then((res: any) => {
      this.results = [];
      this.resultsEspecific = [];
      this.name = res.name;
      this.email = res.email;
      res.results.forEach((_hability: Hability) => {
        const hability = _hability;
        if(hability.isGraphic) {
          this.results.push(hability);
        } else {
          if(hability.name == 'Burnout') {
            this.burnout = hability;
          }
          if(hability.name == 'Financieras') {
            this.financieras = hability;
          }
          if(hability.name == 'Fisicas') {
            this.fisicas = hability;
          }
        }
      });
      this.isLoad = false;
    }).catch( _error => {
      this.router.navigateByUrl ('/erno' );
    });
  }

  public sendEmit(_item: any){
    this.item = _item;
    if( Utils.isDevice() ){
      this.router.navigateByUrl ('/detail', { state: { id:this.id , _item: this.item} ,  });
    } else {
      this.modal.showDialog();
    }
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
}
