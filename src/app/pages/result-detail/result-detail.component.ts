import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routeTransitionAnimations } from '../animations';
import { Hability } from 'src/app/models/i.models';
@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ResultDetailComponent {

  private id: string = '';
  public item: Hability = {} as Hability;

  constructor(private router: Router) {
    const extras:any = this.router.getCurrentNavigation()!.extras.state;
    this.id = extras.id;
    this.item = extras._item;
    console.log(this.router.getCurrentNavigation()!.extras.state);
  }

  public goBack(){
    this.router.navigate(["./response/"+this.id]);
  }

}
