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
    let url = Utils.getHost().concat(environment.typeform.host);
    url = url.replace('{ID}', id);
    const headers = { 
      'Content-Type': 'application/json',
    };
    return this.http.get( url , { responseType: 'json', headers });
  }
}
