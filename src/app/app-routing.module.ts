import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { MapaComponent } from './mapa/mapa.component';
import { AcessoEmpresaComponent } from './acesso-empresa/acesso-empresa.component';
import { AcessoVoluntarioComponent } from './acesso-voluntario/acesso-voluntario.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: MapaComponent, pathMatch: 'full'}, //rota padrao
  { path: 'cadastro', loadChildren: () => import('./cadastro-container/cadastro-container.module').then(m => m.CadastroContainerModule), data: {acao: 'cadastro'}},
  { path: 'edicao', loadChildren: () => import('./cadastro-container/cadastro-container.module').then(m => m.CadastroContainerModule), data: {acao: 'edicao'}},
  { path: 'empresa', component: AcessoEmpresaComponent},
  { path: 'voluntario', component: AcessoVoluntarioComponent},
  { path: 'acesso-negado', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
