import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroContainerRoutingModule } from './cadastro-container-routing.module';
import { CadastroContainerComponent } from './cadastro-container.component';


@NgModule({
  declarations: [
    CadastroContainerComponent
  ],
  imports: [
    CommonModule,
    CadastroContainerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CadastroContainerModule { }
