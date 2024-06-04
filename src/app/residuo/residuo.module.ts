import { NgModule } from '@angular/core';
import { ResiduoComponent } from '../residuo/residuo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ResiduoComponent,
  ],
  imports:[
    FontAwesomeModule,
    CommonModule,
  ],
  exports: [
    ResiduoComponent,
  ]
})
export class ResiduoModule { }
