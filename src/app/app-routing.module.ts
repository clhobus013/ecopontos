import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: MapaComponent, pathMatch: 'full'}, //rota padrao
  { path: 'cadastro', loadChildren: () => import('./cadastro-container/cadastro-container.module').then(m => m.CadastroContainerModule),
  },
  { path: 'acesso-negado', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
