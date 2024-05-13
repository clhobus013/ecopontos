import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { CadastroContainerEmpresaRoutingModule } from './cadastro-container-empresa-routing.module';
import { CadastroContainerEmpresaComponent } from './cadastro-container-empresa.component';


@NgModule({
  declarations: [
    CadastroContainerEmpresaComponent
  ],
  imports: [
    CommonModule,
    CadastroContainerEmpresaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CadastroContainerEmpresaModule { }
