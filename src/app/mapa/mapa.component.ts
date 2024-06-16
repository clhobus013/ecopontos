import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EcopontoService } from '../services/ecoponto.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MapaComponent implements OnInit {

  center: google.maps.LatLngLiteral = { lat: -29.1681, lng: -51.1792 }; // Coordenadas de Caxias do Sul
  display: google.maps.LatLngLiteral | null = null;
  markers: google.maps.LatLngLiteral[] = [];

  zoom = 13;
  icon = 'assets/icone_ecoponto2.png';

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: this.zoom,
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    backgroundColor: 'none',
  };  

  constructor(private ecopontoService: EcopontoService) { }

  ngOnInit(): void {
    this.filtrarEcopontos();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  filtrarEcopontos(event?: any) {

    this.markers = [];

    this.ecopontoService.filtrarEcopontos(event ? event.localizacao : "", event ? event.residuos : [0])
    .subscribe(
      (data: any) => {
        data.values.map((value: any)=> {
          this.markers.push({
            lat: Number(value.localizacao[0].latitude),
            lng: Number(value.localizacao[0].longitude),
          })
        })
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
