import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/api/http.service';

@Component({
  selector: 'app-report-curriculum',
  templateUrl: './report-curriculum.component.html',
  styleUrls: ['./report-curriculum.component.scss']
})
export class ReportCurriculumComponent implements OnInit {

  public responseService:{ text:string, frecuency:string, report: string[] }[] = [];
  public sendReport: {token: string, curriculum: { text:string, frecuency:string, report: string[] }[]} = { token: '', curriculum: [] };
  public isLoad = false;
  public isSaved = false;
  private retryErrors = 0;

  constructor(private route: ActivatedRoute, private service: HttpService, private readonly router: Router){
  }

  ngOnInit(): void {
    const _token = this.route.snapshot.paramMap.get('token') || '';
    this.sendReport.token = _token;
    this.service.getReport(_token).subscribe({
      next: (_response)=> {
        this.responseService = _response;
      },
      error: (_erno) => {
        this.router.navigate(['/not-response']);
        console.error(_erno);
      }
    });
  }

  public guardarCurriculum(){
    this.isLoad = true;
    this.service.updateReport(this.sendReport).subscribe({
      next: (_response) => {
        this.isLoad = false;
        this.isSaved = true;
        console.log(_response);
      },
      error: (_erno) =>{
        this.isLoad = false;
        this.retryErrors += 1;
        alert('Se presentó un error al guardar el avance');
        console.error(_erno);
        if (this.retryErrors > 3) {
          this.router.navigate(['/not-response']);
        }
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
    return (this.sendReport.curriculum.length > 0) && !this.isSaved;
  }
}
