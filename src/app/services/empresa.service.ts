import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Empresa } from '../models/empresa';
import { environment } from 'src/environments/environment';
import { ErroDefault } from '../models/erroDefault';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

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

  getEmpresas(): any {
    return this.http.get<Empresa>(this._url + "/empresa", this.requestOptions);
  }

  getEmpresaPorId(id: number): any {
    return this.http.get<Empresa>(this._url + "/empresa/" + id, this.requestOptions);
  }

  postEmpresa(empresa: Empresa): any {
    const empresaFormatada = empresa.getEmpresaFormatadaApi()
    return this.http.post<ErroDefault>(this._url + "/empresa", empresaFormatada);
  }

  putEmpresa(empresa: Empresa): any {
    const empresaFormatada = empresa.getEmpresaFormatadaApi();
    return this.http.put<ErroDefault>(this._url + "/empresa/" + empresa.id, empresaFormatada);
  }

}
