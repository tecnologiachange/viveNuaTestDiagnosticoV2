import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from 'src/app/services/proccess/process.service';
import { Hability, IExtraLoadding } from 'src/app/models/i.models';

@Component({
  selector: 'app-load-results',
  templateUrl: './load-results.component.html',
  styleUrls: ['./load-results.component.scss']
})
export class LoadResultsComponent implements OnInit{

  private id: string = '';
  constructor(private process: ProcessService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;


    this.process.get(this.id).then((res: any) => {
      let results: Hability[] = [];
      let name = res.name;
      let email = res.email;
      let burnout: Hability = {} as Hability;
      let financieras: Hability = {} as Hability;
      let fisicas: Hability = {} as Hability;
      res.results.forEach((hability: Hability) => {
        if(hability.isGraphic) {
          results.push(hability);
        } else {
          if(hability.name == 'Burnout') {
            burnout = hability;
          }
          if(hability.name == 'Financieras') {
            financieras = hability;
          }
          if(hability.name == 'Fisicas') {
            fisicas = hability;
          }
        }
      });
      this.process.getDefinitionScore({burnout, financieras, fisicas}).then( (res: any) => {  
        let extra: IExtraLoadding
        = { results, name, email, burnout: res.burnout, financieras: res.financieras, fisicas: res.fisicas , id: this.id };
        this.router.navigateByUrl ('/results' , { state: extra } );
      });
    }).catch( _error => {
      this.router.navigateByUrl ('/erno' );
    });
  }
}
