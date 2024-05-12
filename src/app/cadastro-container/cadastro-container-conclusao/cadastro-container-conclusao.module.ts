import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroContainerConclusaoRoutingModule } from './cadastro-container-conclusao-routing.module';
import { CadastroContainerConclusaoComponent } from './cadastro-container-conclusao.component';


@NgModule({
  declarations: [
    CadastroContainerConclusaoComponent
  ],
  imports: [
    CommonModule,
    CadastroContainerConclusaoRoutingModule
  ]
})
export class CadastroContainerConclusaoModule { }
