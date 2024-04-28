import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContainerEmpresaComponent } from './cadastro-container-empresa.component';

const routes: Routes = [{ path: '', component: CadastroContainerEmpresaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContainerEmpresaRoutingModule { }
