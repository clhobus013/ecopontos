import { NgModule } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports:[
    CommonModule,
    NgxLoadingModule.forRoot({fullScreenBackdrop: true, primaryColour: '#177292', secondaryColour: '#177292', tertiaryColour: '#177292'})
  ],
  exports: [
    LoadingComponent,
  ]
})
export class LoadingModule { }
