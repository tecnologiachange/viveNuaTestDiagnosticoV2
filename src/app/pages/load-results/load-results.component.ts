import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from 'src/app/services/proccess/process.service';
import { Hability, IExtraLoadding, Subhability } from 'src/app/models/i.models';
import { Utils } from 'src/app/services/utils/utils.service';
import { GetService } from 'src/app/services/firebase/get.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-load-results',
  templateUrl: './load-results.component.html',
  styleUrls: ['./load-results.component.scss']
})
export class LoadResultsComponent implements OnInit{

  private id: string = '';
  constructor(private process: ProcessService, private route: ActivatedRoute, private router: Router, private getService: GetService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getInformationToResults(this.id).then( (res: any) => {  
      console.log(res);
      this.router.navigateByUrl ('/results' , { state: res } );
    }).catch( _error => {
      console.error(_error);
      this.router.navigateByUrl ('/erno' );
    });
  }

  private async getInformationToResults(id: string): Promise<IExtraLoadding> {
    try{
      let res = await this.process.get(this.id);
      let arrayPorcentEspecialities = await Utils.transformObservableToPromise(this.getService.get(environment.storage.score));
      let results: Hability[] = [];
      let arrayToSubhabilities: Subhability[] = [];
      let name = res.name;
      let email = res.email;
      let recommend = res.recommend;
      let burnout: Hability = {} as Hability;
      let financieras: Hability = {} as Hability;
      let fisicas: Hability = {} as Hability;
      res.results.forEach((habilityInput: Hability) => {
        let hability: Hability = habilityInput;
        const nameSearch = Utils.standartText(hability.name);
        const textToDescribe = arrayPorcentEspecialities.find((item: any) => nameSearch == item.id );
        hability.subhabilities.forEach((subhability: any) => {
          const nameSearch = Utils.standartText(subhability.name);
          const textToDescribe = arrayPorcentEspecialities.find((item: any) => nameSearch == item.id );
          subhability.descripcion = (textToDescribe) ? this.getDescriptionSubhability(textToDescribe, subhability) : subhability.description;
          if(hability.isGraphic && arrayToSubhabilities.findIndex((item: Subhability) => item.name == subhability.name) == -1){
            arrayToSubhabilities.push(subhability);
          }
        });

        if(hability.isGraphic) {
          hability.description = this.getDescription(textToDescribe, hability);
          results.push( hability );
        } else {
          if(hability.name == 'Burnout') {
            hability.aditionalDescription = this.getDescription(textToDescribe, hability , false);
            burnout = hability;
          }
          if(hability.name == 'Financieras') {
            hability.description = this.getDescription(textToDescribe, hability);
            financieras = hability;
          }
          if(hability.name == 'Fisicas' || hability.name == 'Fisícas' || hability.name == 'Físicas') {
            hability.description = this.getDescription(textToDescribe, hability);
            fisicas = hability;
          }
        }
      });
      
      // res = await this.process.getDefinitionScore({burnout, financieras, fisicas});
      return { results, name, email, burnout, financieras, fisicas , id , recommend, subhabilities: arrayToSubhabilities.filter( item => (item.descripcion != undefined && item.descripcion != '') ) }
    }catch(_e){
      console.error(_e);
    }
    return { results: [], name: '', email:'', burnout: undefined, financieras: undefined, fisicas: undefined , id , recommend: {} as any , subhabilities: []};
  }

  private getDescription( textToDescribe: any, hability: Hability , isIntoDescription: boolean = true){
    const percentReal = Math.round(hability.percent * 100 );
    let message = '';
    Object.keys(textToDescribe).forEach((key: any) => {
      const item = textToDescribe[key];
      if( typeof item == 'object'){
        const min = item['valueMin'];
        const max = item['valueMax'];
        const description = item['description'];
        if( min <= percentReal && percentReal <= max){
          if(isIntoDescription){
            message = description.replace('XXX', percentReal.toString() + '%');
          }else{
            message = description.replace('XXX', percentReal.toString() + '%');
          };
        }
      }
    });
    return message;
  }

  private getDescriptionSubhability( textToDescribe: any, hability: Subhability){
    let message = '';
    Object.keys(textToDescribe).forEach((key: any) => {
      const item = textToDescribe[key];
      if( typeof item == 'object'){
        const min = item['valueMin'];
        const max = item['valueMax'];
        const description = item['description'];
        if( min <= (hability.visualPercent || 0) && (hability.visualPercent || 0) <= max){
            message = description.replace('XXX', (hability.visualPercent || 0).toString() + '%');
        }
      }
    });
    return message;
  }
}
