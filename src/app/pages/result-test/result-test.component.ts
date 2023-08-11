import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routeTransitionAnimations } from '../animations';
import { ProcessService } from 'src/app/services/proccess/process.service';
import { Hability } from 'src/app/models/i.models';
import { Utils } from 'src/app/services/utils/utils.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';


@Component({
  selector: 'app-result-test',
  templateUrl: './result-test.component.html',
  styleUrls: ['./result-test.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ResultTestComponent implements OnInit{

  public name: string = '';
  public sectionsColors = [ "#2f9ea2", "#9f7eee", "#5325a0", "#311868" ];
  public percent = 50;
  public results: Hability[] = [];
  public resultsEspecific: Hability[] = [];
  public id: string = '';
  public item: Hability = {} as Hability;
  @ViewChild('modal') modal!: ModalComponent;

  constructor(private route: ActivatedRoute, private router: Router , private process: ProcessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.process.get(this.id).then((res: any) => {
      this.results = [];
      this.resultsEspecific = [];
      this.name = res.name;
      res.results.forEach((item: Hability) => {
        if(item.isGraphic) {
          this.results.push(item);
        } else {
          this.resultsEspecific.push(item);
        }
      });
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
}
