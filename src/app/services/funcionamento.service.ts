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

  getFuncionamentos(): any {
    return this.http.get<Funcionamento>(this._url + "/funcionamento", this.requestOptions);
  }

  getFuncionamentoPorId(id: number): any {
    console.log("Funcionamento id ", id);
    return this.http.get<Funcionamento>(this._url + "/funcionamento/" + id, this.requestOptions);
  }

  postFuncionamento(ecopontoId: number, funcionamentos: Funcionamento[]): any {

    const body = {
      "ecoponto_id": ecopontoId,
      "dia_funcionamento": [
        funcionamentos.map((func: Funcionamento)=> func.getFuncionamentoFormatadoApi())
      ]
    }

    console.log(" >> >> RESULTADO CORPO FORMATADO ", body);

    // const funcionamentoFormatado = funcionamento.getFuncionamentoFormatadoApi()
    return this.http.post<ErroDefault>(this._url + "/funcionamento", body);
  }

  putFuncionamento(funcionamento: Funcionamento): any {
    const funcionamentoFormatado = funcionamento.getFuncionamentoFormatadoApi();
    return this.http.put<ErroDefault>(this._url + "/funcionamento/" + funcionamento.id, funcionamentoFormatado);
  }

}
