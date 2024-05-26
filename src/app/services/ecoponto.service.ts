import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ErroDefault } from '../models/erroDefault';
import { Ecoponto } from '../models/ecoponto';

@Injectable({
  providedIn: 'root'
})
export class EcopontoService {

  private _url: string = environment.apiUrl;

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',    'Access-Control-Allow-Origin': '*'
  }

  requestOptions = {                      
    headers: new HttpHeaders(this.headerDict), 
  };

  constructor(private http: HttpClient) { }

  getEcopontos(): any {
    return this.http.get<Ecoponto>(this._url + "/ecoponto", this.requestOptions);
  }

  getEcopontoPorId(id: number): any {
    console.log("ecoponto id ", id);
    return this.http.get<Ecoponto>(this._url + "/ecoponto/" + id, this.requestOptions);
  }

  postEcoponto(ecoponto: Ecoponto): any {
    const ecopontoFormatado = ecoponto.getEcopontoFormatadoApi();
    console.log("Post ecoponto ", ecoponto, ecopontoFormatado);
    return this.http.post<ErroDefault>(this._url + "/ecoponto", ecopontoFormatado);
  }

  putEcoponto(ecoponto: Ecoponto): any {
    const ecopontoFormatado = ecoponto.getEcopontoFormatadoApi();
    return this.http.put<ErroDefault>(this._url + "/ecoponto/" + ecoponto.id, ecopontoFormatado);
  }

  deleteEcoponto(id: number): any {
    return this.http.delete<ErroDefault>(this._url + "/ecoponto/" + id);
  }

}
