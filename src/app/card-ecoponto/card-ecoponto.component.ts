import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Ecoponto } from '../models/ecoponto';
import { EcopontoService } from '../services/ecoponto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EcopontoComponent } from '../ecoponto/ecoponto.component';

@Component({
  selector: 'app-card-ecoponto',
  templateUrl: './card-ecoponto.component.html',
  styleUrls: ['./card-ecoponto.component.scss']
})
export class CardEcopontoComponent implements OnInit {
  // Recebe infos do elemento pai
  @Input() ecoponto: Ecoponto|undefined = undefined;
  @Input() index: number|undefined = undefined;
  @Input() tipo: number = 0; // 1-empresa 2-voluntario
  // Envia infos para o elemento pai
  @Output() respostaEcoponto  = new EventEmitter();
  @Output() clickSituacao  = new EventEmitter();

  @ViewChild('ecopontoModal') modal?: EcopontoComponent;

  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;

  constructor(private ecopontoService: EcopontoService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {}

  public remover() {
    this.ecopontoService.deleteEcoponto(this.ecoponto!.id).subscribe(
      (data: any) => {
        this.toastr.success('', 'Ecoponto removido com sucesso', {
          timeOut: 1500,
          positionClass: 'toast-bottom-right'
        })
        this.respostaEcoponto.emit({"id": this.ecoponto!.id, "index": this.index, "ecoponto": null});
        this.ecoponto = undefined;
      },
      (error: any) => {
        this.toastr.success(error.error.message, 'Não foi possível remover o ecoponto', {
          timeOut: 1500,
          positionClass: 'toast-bottom-right'
        })
      }
    );
  }

  public editar() {
    if(this.ecoponto != undefined) {
      localStorage.setItem('ecopontoId', this.ecoponto.id.toString());
    }
    
    this.router.navigate(["/edicao/ecoponto"]);
  }

  public alterarSituacao() {
    this.clickSituacao.emit({"id": this.ecoponto!.id, "index": this.index, "ecoponto": this.ecoponto});
  }

  public verDetalhesEcoponto() {
    this.modal?.abrir();
  }

}
