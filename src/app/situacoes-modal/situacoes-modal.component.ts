import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { EcopontoService } from '../services/ecoponto.service';
import { Situacao } from '../models/situacao';
import { Ecoponto } from '../models/ecoponto';

@Component({
  selector: 'app-situacoes-modal',
  templateUrl: './situacoes-modal.component.html',
  styleUrls: ['./situacoes-modal.component.scss']
})
export class SituacoesModalComponent implements OnInit {
  @Input() ecoponto: Ecoponto|undefined = undefined;

  @Output() retornaSituacao  = new EventEmitter();
  
  aberto: boolean = false;
  situacoes: Situacao[] = [];

  faClose = faClose;

  constructor(private ecopontoService: EcopontoService) { }

  ngOnInit(): void {
    this.buscarSituacoes();
  }

  public buscarSituacoes() {
    this.ecopontoService.getSituacoes().subscribe(
      (data: any) => {
        this.situacoes = data.values.map((value: any)=> new Situacao({"situacao": value.situacao, "situacaoEnum": value.situacao_enum}))
      },
      (error: any) => {
      }
    );
  }

  public abrir() {
    this.aberto = true;
  }

  public fechar() {
    this.aberto = false;
  }

  public salvar() {

    this.ecopontoService.putSituacao(this.ecoponto!.situacao!.situacaoEnum, this.ecoponto!.id).subscribe(
      (data: any) => {
        this.retornaSituacao.emit({"id": this.ecoponto!.id, "situacao": this.ecoponto!.situacao!.situacaoEnum});
      },
      (error: any) => {
      }
    );

    this.fechar();
  }

}
