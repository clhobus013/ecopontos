import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContainerComponent } from './cadastro-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'empresa',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CadastroContainerComponent,
    children: [
      {
        path: 'empresa',
        loadChildren: () =>
          import('./cadastro-container-empresa/cadastro-container-empresa.module').then(
            (module) => module.CadastroContainerEmpresaModule
          ),
      },
      {
        path: 'ecoponto',
        loadChildren: () =>
          import('./cadastro-container-ecoponto/cadastro-container-ecoponto.module').then(
            (module) => module.CadastroContainerEcopontoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContainerRoutingModule { }
