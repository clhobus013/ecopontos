import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-container-conclusao',
  templateUrl: './cadastro-container-conclusao.component.html',
  styleUrls: ['./cadastro-container-conclusao.component.scss']
})
export class CadastroContainerConclusaoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public finalizar() {
    this.router.navigate(["/empresa"]);
  }

}
