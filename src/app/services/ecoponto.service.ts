import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ErroDefault } from '../models/erroDefault';
import { Ecoponto } from '../models/ecoponto';
import { Residuo } from '../models/residuo';

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

  getEcopontosControle(): any {
    return this.http.get<Ecoponto>(this._url + "/ecoponto/controle", this.requestOptions);
  }

  getSituacoes(): any {
    return this.http.get<Ecoponto>(this._url + "/ecoponto/situacao", this.requestOptions);
  }

  putSituacao(situacao: string, ecopontoId: number): any {
    return this.http.put<Ecoponto>(this._url + "/ecoponto/" + situacao + "/" + ecopontoId, this.requestOptions);
  }

  getResiduos(): any {
    return this.http.get<Residuo>(this._url + "/residuo", this.requestOptions);
  }

  filtrarEcopontos(localizacao?: string, residuosId?: number[]): any {

    let params = "";

    if (localizacao) {
      params += "?localizacao=" + localizacao;
    }

    if (residuosId) {
      params += !params ? "?" : "&";
      params += "residuo_id=" + residuosId[0];
    }

    return this.http.get<Ecoponto>(this._url + "/ecoponto" + params, this.requestOptions);
  }
}
