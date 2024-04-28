import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroContainerComponent } from '../cadastro-container.component';

@Component({
  selector: 'app-cadastro-container-empresa',
  templateUrl: './cadastro-container-empresa.component.html',
  styleUrls: ['./cadastro-container-empresa.component.scss']
})
export class CadastroContainerEmpresaComponent implements OnInit {

  form!: FormGroup;

  constructor(private formContainer: CadastroContainerComponent) {}

  ngOnInit() {
    this.form = this.formContainer.getEmpresaForm();
  }
}
