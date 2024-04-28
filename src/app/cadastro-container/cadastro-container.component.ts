import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { Empresa } from '../models/empresa';

@Component({
  selector: 'app-cadastro-container',
  templateUrl: './cadastro-container.component.html',
  styleUrls: ['./cadastro-container.component.scss']
})
export class CadastroContainerComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private empresaService: EmpresaService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      empresa: this.formBuilder.group({
        nomeEmpresa: [null, [Validators.required]],
        nomeResponsavel: [null, [Validators.required]],
        telefone: [null, [Validators.required]],
        redeSocial: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required]],
      }),
      ecoponto: this.formBuilder.group({
        nome: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        endereco: '',
        numero: '',
        latitude: '',
        longitude: '',
        abertoPublico: '',
      }),
    });
  }

  getEmpresaForm(): FormGroup {
    return this.form.get('empresa') as FormGroup;
  }

  getEcopontoForm(): FormGroup {
    return this.form.get('ecoponto') as FormGroup;
  }


  passo = 0;
  indicadores = [
    { id: 0, label: 'Empresa' },
    { id: 1, label: 'Ecoponto' },
    { id: 2, label: 'Horário de funcionamento' },
    { id: 3, label: 'Resíduo' },
  ];

  proximoPasso() {
    console.log("Proximo passo");
    if (this.passo < 3) {
      this.passo++;
    }
  }

  passoAnterior() {
    if (this.passo > 0) {
      this.passo--;
    }
  }

  //Teste api
  public getEcoponto() {
    this.empresaService.getEmpresa()
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // Teste api
  public cadastraEmpresa() {
    let empresa = new Empresa("teste", "razao", "05112929022", "mome_resp", "ramo", "tele", "email", "rede", false, "desc", [], []);
    this.empresaService.postEmpresa(empresa)
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

}
