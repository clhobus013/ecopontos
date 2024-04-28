import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContainerEcopontoComponent } from './cadastro-container-ecoponto.component';

const routes: Routes = [{ path: '', component: CadastroContainerEcopontoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContainerEcopontoRoutingModule { }
