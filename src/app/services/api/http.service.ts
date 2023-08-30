import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/utils.service';
import { Observable } from 'rxjs';

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

  public post(body: {email: string, name: string,reportId: string}): Observable<any> {
    let url = Utils.getHost().concat(environment.typeform.email);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.post( url , body , { responseType: 'json', headers });
  }
}
