import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/api/http.service';

@Component({
  selector: 'app-report-curriculum',
  templateUrl: './report-curriculum.component.html',
  styleUrls: ['./report-curriculum.component.scss']
})
export class ReportCurriculumComponent implements OnInit {

  public responseService:{ text:string, frecuency:string, report: string[] }[] = [];
  public sendReport: {token: string, curriculum: { text:string, frecuency:string, report: string[] }[]} = { token: '', curriculum: [] };

  constructor(private route: ActivatedRoute, private service: HttpService){
  }

  ngOnInit(): void {
    const _token = this.route.snapshot.paramMap.get('token') || '';
    this.sendReport.token = _token;
    this.service.getReport(_token).subscribe({
      next: (_response)=> {
        this.responseService = _response;
      },
      error: (_erno) => {
        console.error(_erno);
      }
    });
  }

  public guardarCurriculum(){
    this.service.updateReport(this.sendReport).subscribe({
      next: (_response) => {
        console.log(_response);
      },
      error: (_erno) =>{
        console.error(_erno);
      }
    });
  }

  public seleccionar(item: { text:string, frecuency:string, report: string[] }){
    const _index = this.sendReport.curriculum.indexOf(item);
    if ( _index > -1 ) {
      this.sendReport.curriculum.splice(_index);
    } else {
      this.sendReport.curriculum.push(item);
    }
  }

  public getLabel(item: { text:string, frecuency:string, report: string[] }){
    return ( this.sendReport.curriculum.indexOf(item) > -1 ) ? 'Quitar del reporte' : 'Reportar';
  }
  
  public isValidate() {
    return (this.sendReport.curriculum.length > 0);
  }
}
