import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroContainerComponent } from '../cadastro-container.component';

@Component({
  selector: 'app-cadastro-container-ecoponto',
  templateUrl: './cadastro-container-ecoponto.component.html',
  styleUrls: ['./cadastro-container-ecoponto.component.scss']
})
export class CadastroContainerEcopontoComponent implements OnInit {

  form!: FormGroup;

  constructor(private formContainer: CadastroContainerComponent) {}

  ngOnInit() {
    this.form = this.formContainer.getEcopontoForm();
  }

  proximo() {
    this.formContainer.proximoPasso();
  }

  submit() {
    console.log("Enviou formulario")
  }

}
