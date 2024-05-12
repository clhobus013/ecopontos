import { Component, OnInit } from '@angular/core';
import { CadastroContainerComponent } from '../cadastro-container.component';
import { FormArray, FormGroup } from '@angular/forms';
import { DiasFuncionamento } from 'src/app/models/diasFuncionamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-container-horario',
  templateUrl: './cadastro-container-horario.component.html',
  styleUrls: ['./cadastro-container-horario.component.scss']
})
export class CadastroContainerHorarioComponent implements OnInit {

  form!: FormGroup;
  horarios!: FormArray;
  diasSemana!: DiasFuncionamento[];

  constructor(private formContainer: CadastroContainerComponent, private router: Router) {}

  ngOnInit() {
    this.form = this.formContainer.getHorarioForm();
    this.horarios = this.form.get('horarios') as FormArray;
    this.diasSemana = this.formContainer.diasFuncionamento;
  }

  getHorario(itemIndex: number) {
    return this.horarios.at(itemIndex) as FormGroup;
  }

  proximo() {
    this.router.navigate(["/cadastro/conclusao"]);
  }

}
