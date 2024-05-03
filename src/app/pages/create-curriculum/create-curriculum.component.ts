import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/api/http.service';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.scss']
})
export class CreateCurriculumComponent {

  public extras;
  public listHabilities: { text: string, frecuency: string }[] = [];

  constructor(private router: Router, private location: Location, private service: HttpService) { 
    this.extras = (this.router.getCurrentNavigation()!.extras.state as any).extras;
  }

  goBack(): void {
    this.location.back();
  }

  public add():void{
    this.listHabilities.push({text:'', frecuency:''});
  }

  public isValidate(): boolean {
    return this.listHabilities.filter( item => (item.text !== '' && item.frecuency !== '')).length === this.listHabilities.length ;
  }

  public save(): void{
    const sendObject = {
      "nombre": this.extras.name,
      "correo": 'adgsgutierrez@gmail.com',//this.extras.email,
      "curriculum": this.listHabilities
    };
    this.service.sendReport(sendObject).subscribe({
      next: (_response) => {
        console.log(_response);
        alert('Se guardó de forma exitosa')
      },
      error: (_erno) => {
        console.error(_erno);
        alert('Se presentó un error al guardar el curriculum');
      }
    })
  }
}
