import { Component, Input, OnInit } from '@angular/core';
import { CadastroContainerHorarioComponent } from '../cadastro-container-horario.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-horario',
  templateUrl: './select-horario.component.html',
  styleUrls: ['./select-horario.component.scss']
})
export class SelectHorarioComponent implements OnInit {

  @Input() index!: number;
  @Input() diaSemana!: string;

  form!: FormGroup;

  constructor(private formArray: CadastroContainerHorarioComponent) { }

  ngOnInit(): void {
    this.form = this.formArray.getHorario(this.index);
  }

}
