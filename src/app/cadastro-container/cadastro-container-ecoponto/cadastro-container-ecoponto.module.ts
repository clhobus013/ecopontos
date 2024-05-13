import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { CadastroContainerEcopontoRoutingModule } from './cadastro-container-ecoponto-routing.module';
import { CadastroContainerEcopontoComponent } from './cadastro-container-ecoponto.component';


@NgModule({
  declarations: [
    CadastroContainerEcopontoComponent
  ],
  imports: [
    CommonModule,
    CadastroContainerEcopontoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CadastroContainerEcopontoModule { }
