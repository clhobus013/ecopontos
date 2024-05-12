import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContainerComponent } from './cadastro-container.component';
import { AuthGuard } from '../services/auth-guard.service';

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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./cadastro-container-ecoponto/cadastro-container-ecoponto.module').then(
            (module) => module.CadastroContainerEcopontoModule
          ),
      },
      {
        path: 'horario',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./cadastro-container-horario/cadastro-container-horario.module').then(
            (module) => module.CadastroContainerHorarioModule
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
