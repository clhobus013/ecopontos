import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { Router } from '@angular/router';
import { DiasFuncionamento } from '../models/diasFuncionamento';

export interface Indicador {
  id: number;
  label: string;
  route: string;
}

@Component({
  selector: 'app-cadastro-container',
  templateUrl: './cadastro-container.component.html',
  styleUrls: ['./cadastro-container.component.scss']
})
export class CadastroContainerComponent implements OnInit {

  form!: FormGroup;

  diasFuncionamento: DiasFuncionamento[] = [
    DiasFuncionamento.segunda,
    DiasFuncionamento.terca,
    DiasFuncionamento.quarta,
    DiasFuncionamento.quinta,
    DiasFuncionamento.sexta,
    DiasFuncionamento.sabado,
    DiasFuncionamento.domingo,
  ]

  passo = 0;
  indicadores: Indicador[] = [
    { id: 0, label: 'Empresa', route: '/cadastro/empresa' },
    { id: 1, label: 'Ecoponto', route: '/cadastro/ecoponto' },
    { id: 2, label: 'Horário de funcionamento', route: '/cadastro/horario' },
  ];

  constructor(private formBuilder: FormBuilder, private empresaService: EmpresaService, private router: Router) {}

  // Ver rotas:
  // https://balta.io/blog/angular-rotas-guardas-navegacao

  ngOnInit() {
    this.form = this.formBuilder.group({
      empresa: this.formBuilder.group({
        id: [{value: null, disabled:true}],
        nomeFantasia: [null, [Validators.required]],
        razaoSocial: [null, [Validators.required]],
        cnpj: [null, [Validators.required]],
        ramoAtuacao: [null, [Validators.required]],
        nomeContatoResponsavel: [null, [Validators.required]],
        telefone: [null, [Validators.required]],
        redeSocial: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required]],
        descricaoOutrosProjetos: [null],
      }),
      ecoponto: this.formBuilder.group({
        id: [{value: null, disabled:true}],
        nome: [null, [Validators.required]],
        cep: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        rua: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        latitude: [null, [Validators.required]],
        longitude: [null, [Validators.required]],
        aberto_publico: [null, [Validators.required]],
        residuos: [null],
        // residuos: [null, [Validators.required]],
      }),
      // horario: this.formBuilder.group({
        // }),
      horario: this.formBuilder.group({
        horarios: this.formBuilder.array(
          this.diasFuncionamento.map(() => {
            return this.formBuilder.group({
              dia: [null, [Validators.required]],
              inicio: [null, [Validators.required]],
              fim: [null, [Validators.required]],
            })
          })
        )
      }),
      residuo: this.formBuilder.group({
        id: [null, [Validators.required]],
      }),
    });
  }

  getEmpresaForm(): FormGroup {
    return this.form.get('empresa') as FormGroup;
  }

  getEcopontoForm(): FormGroup {
    return this.form.get('ecoponto') as FormGroup;
  }

  getHorarioForm(): FormGroup {
    return this.form.get('horario') as FormGroup;
  }

  public irPara(index: number) {
    this.passo = index;
    this.router.navigate([this.indicadores[index].route]);
  }

  public proximoPasso() {
    if (this.passo < 2) {
      this.passo++;

      if(this.passo != this.indicadores.length) {
        this.router.navigate([this.indicadores[this.passo].route]);
      } else {
        // Direciona para tela de sucesso
      }
    }
  }

  passoAnterior() {
    if (this.passo > 0) {
      this.passo--;
    }
  }

}
