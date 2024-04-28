import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'}, //rota padrao
  // {path: 'inicio', component: Component} ,
  { path: 'cadastro', loadChildren: () => import('./cadastro-container/cadastro-container.module').then(m => m.CadastroContainerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
