import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { ResiduoComponent } from './residuo/residuo.component';
import { MapaComponent } from './mapa/mapa.component';

// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }
// window.initMap = initMap;

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ResiduoComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
