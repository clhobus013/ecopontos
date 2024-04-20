import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  residuos: String[] = [];

  constructor() { }

  ngOnInit(): void {
    this.residuos = [
      "Esponja de cozinha",
      "Pilha",
      "Cápsula de café",
    ]
  }

}
