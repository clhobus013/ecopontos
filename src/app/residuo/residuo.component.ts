import { Component, Input, OnInit } from '@angular/core';
import { Residuo } from '../models/residuo';

@Component({
  selector: 'app-residuo',
  templateUrl: './residuo.component.html',
  styleUrls: ['./residuo.component.scss']
})
export class ResiduoComponent implements OnInit {

  @Input() residuo?: Residuo;

  selecionado: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public selecionar() {
    this.residuo!.ativo = !this.residuo?.ativo;
  }

}
