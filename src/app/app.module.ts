import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoadingModule } from './loading/loading.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

import { FiltroComponent } from './filtro/filtro.component';
import { MapaComponent } from './mapa/mapa.component';
import { AcessoEmpresaComponent } from './acesso-empresa/acesso-empresa.component';
import { CardEcopontoComponent } from './card-ecoponto/card-ecoponto.component';
import { AcessoVoluntarioComponent } from './acesso-voluntario/acesso-voluntario.component';
import { SituacoesModalComponent } from './situacoes-modal/situacoes-modal.component';
import { ResiduoModule } from './residuo/residuo.module';
import { LoadingInterceptor } from './loading/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FiltroComponent,
    MapaComponent,
    AcessoEmpresaComponent,
    CardEcopontoComponent,
    AcessoVoluntarioComponent,
    SituacoesModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ResiduoModule,
    LoadingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
 }],
  bootstrap: [AppComponent]
})
export class AppModule { }
