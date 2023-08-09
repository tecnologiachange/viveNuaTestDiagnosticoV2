import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(id: string): any {
    const key = Utils.getPropertiesForHost() ? 'check' : 'qa' ;
    let url = environment.typeform.host;
    url = url.replace('{NEXT_PUBLIC_FORM_ID}', environment.typeform.form[key]);
    url = url.replace('{ID}', id);
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ environment.typeform.token[key] }`,
    };
    return this.http.get( url , { responseType: 'json', headers });
  }
}
