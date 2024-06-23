import { Component, Input, OnInit } from '@angular/core';
import { Ecoponto } from '../models/ecoponto';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ecoponto',
  templateUrl: './ecoponto.component.html',
  styleUrls: ['./ecoponto.component.scss']
})
export class EcopontoComponent implements OnInit {

  @Input() ecoponto: Ecoponto|undefined = undefined;
  
  aberto: boolean = false;
  
  faClose = faClose;

  constructor() { }

  ngOnInit(): void {
    console.log("Ecoponto: ", this.ecoponto)
  }

  public abrir() {
    this.aberto = true;
  }

  public fechar() {
    this.aberto = false;
  }

}
