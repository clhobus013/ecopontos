import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContainerHorarioComponent } from './cadastro-container-horario.component';

const routes: Routes = [{ path: '', component: CadastroContainerHorarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContainerHorarioRoutingModule { }
