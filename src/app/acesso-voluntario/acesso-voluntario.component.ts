import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { EcopontoService } from '../services/ecoponto.service';
import { Ecoponto } from '../models/ecoponto';
import { Situacao } from '../models/situacao';
import { SituacoesModalComponent } from '../situacoes-modal/situacoes-modal.component';

@Component({
  selector: 'app-acesso-voluntario',
  templateUrl: './acesso-voluntario.component.html',
  styleUrls: ['./acesso-voluntario.component.scss']
})
export class AcessoVoluntarioComponent implements OnInit {

  @ViewChild('situacaoModal') modal?: SituacoesModalComponent;

  ecopontoEditar?: Ecoponto;
  situacoes: Situacao[] = [];
  aberto: boolean = false;
  loading: boolean = false;

  chevronUp = faChevronUp;
  chevronDown = faChevronDown;

  constructor(private ecopontoService: EcopontoService) { }

  ngOnInit(): void {
    this.buscaEcopontos();
  }

  public expandir(situacao: Situacao) {
    situacao.aberto = !situacao.aberto;
  }

  public buscaEcopontos() {

    this.loading = true;

    this.ecopontoService.getEcopontosControle().subscribe(
      (data: any) => {

        this.situacoes = [];

        data.values.forEach((value: any) => {
          this.situacoes.push(new Situacao({
              "situacao": value.situacao,
              "situacaoEnum": value.situacao_enum,
              "ecopontos": value.ecopontos.map((ecoponto: Ecoponto)=> Ecoponto.formataApi(ecoponto))
          }))
        });
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  alteraSituacao(respostaEcoponto: any) {
    this.modal?.abrir();
    this.ecopontoEditar = respostaEcoponto.ecoponto;
  }

  retornaSituacao(retornoSituacao: any) {
    this.buscaEcopontos();
  }

}
