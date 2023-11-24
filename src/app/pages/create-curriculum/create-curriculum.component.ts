import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.scss']
})
export class CreateCurriculumComponent {

  public extras;
  public listHabilities: { hability: string, time: string }[] = [];

  constructor(private router: Router, private location: Location  ) { 
    this.extras = (this.router.getCurrentNavigation()!.extras.state as any).extras;
  }

  goBack(): void {
    this.location.back();
  }

  public add():void{
    this.listHabilities.push({hability:'', time:''});
  }

  public isValidate(): boolean {
    return this.listHabilities.filter( item => (item.hability !== '' && item.time !== '')).length === this.listHabilities.length ;
  }

  public save(): void{

  }
}
