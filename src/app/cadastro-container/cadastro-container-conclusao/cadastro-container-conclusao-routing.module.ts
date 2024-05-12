import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContainerConclusaoComponent } from './cadastro-container-conclusao.component';

const routes: Routes = [{ path: '', component: CadastroContainerConclusaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContainerConclusaoRoutingModule { }
