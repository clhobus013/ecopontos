import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroContainerHorarioRoutingModule } from './cadastro-container-horario-routing.module';
import { CadastroContainerHorarioComponent } from './cadastro-container-horario.component';
import { SelectHorarioComponent } from './select-horario/select-horario.component';


@NgModule({
  declarations: [
    CadastroContainerHorarioComponent,
    SelectHorarioComponent
  ],
  imports: [
    CommonModule,
    CadastroContainerHorarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CadastroContainerHorarioModule { }
