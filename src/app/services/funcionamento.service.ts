import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ErroDefault } from '../models/erroDefault';
import { Funcionamento } from '../models/funcionamento';

@Injectable({
  providedIn: 'root'
})
export class FuncionamentoService {

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

  postFuncionamento(ecopontoId: number, funcionamentos: Funcionamento[]): any {

    const body = {
      "ecoponto_id": ecopontoId,
      "dia_funcionamento": funcionamentos.map((func: Funcionamento)=> func.getFuncionamentoFormatadoApi())
    }

    return this.http.post<ErroDefault>(this._url + "/ecoponto/funcionamento", body);
  }

  putFuncionamento(ecopontoId: number, funcionamentos: Funcionamento[]): any {

    const body = {
      "ecoponto_id": ecopontoId,
      "dia_funcionamento": funcionamentos.map((func: Funcionamento)=> { return func.getFuncionamentoFormatadoApi()})
    }

    return this.http.put<ErroDefault>(this._url + "/ecoponto/funcionamento", body);
  }

}
