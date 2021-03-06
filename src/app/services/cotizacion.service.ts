import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CotizacionService {
  public urlBCS: string;

  constructor(private _http: Http) {
    this.urlBCS = GLOBAL.urlBCS;
  }

  create(item, nombre, email) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.urlBCS + 'cotizacionweb/create/' + item + '/' + nombre + '/' + email, { headers: headers })
      .map(res => res.json());
  }
}
