import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routeTransitionAnimations } from '../animations';
import { ProcessService } from 'src/app/services/proccess/process.service';
import { Hability } from 'src/app/models/i.models';


@Component({
  selector: 'app-result-test',
  templateUrl: './result-test.component.html',
  styleUrls: ['./result-test.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ResultTestComponent implements OnInit{

  public sectionsColors = [ "#2f9ea2", "#9f7eee", "#5325a0", "#311868" ];
  public percent = 50;
  public results: Hability[] = [];
  private id: string = '';

  constructor(private route: ActivatedRoute, private router: Router , private process: ProcessService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.process.get(this.id).then((res: any) => {
       this.results = res; 
    });
  }

  public sendEmit(_item: any){
    this.router.navigateByUrl ('/detail', { state: { id:this.id , _item} ,  });
  }

}
