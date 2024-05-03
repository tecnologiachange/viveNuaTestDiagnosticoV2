import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/utils.service';
import { Observable } from 'rxjs';
import { paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(id: string): Observable<any> {
    let url = Utils.getHost().concat(environment.typeform.host);
    url = url.replace('{ID}', id);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.get( url , { responseType: 'json', headers });
  }

  public post(body: any): Observable<any> {
    let url = Utils.getHost().concat(environment.typeform.email);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.post( url , body , { responseType: 'json', headers });
  }

  public sendReport(body: { nombre: string, correo: string, curriculum: { text:string, frecuency:string }[] }): Observable<any> {
    let url = environment.api.host.concat(paths.curriculum.save);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.post( url , body , { responseType: 'json', headers });
  }

  public getReport(token: string): Observable<any> {
    let url = environment.api.host.concat(paths.curriculum.validate).concat(token);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.get( url , { responseType: 'json', headers });
  }

  public updateReport(body: { token: string, curriculum: { text:string, frecuency:string }[] }): Observable<any> {
    let url = environment.api.host.concat(paths.curriculum.use);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.put( url , body , { responseType: 'json', headers });
  }
}
