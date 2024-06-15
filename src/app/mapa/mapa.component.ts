import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EcopontoService } from '../services/ecoponto.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MapaComponent implements OnInit {

  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    backgroundColor: 'none',
  };

  display: google.maps.LatLngLiteral | null = null;
  center: google.maps.LatLngLiteral = { lat: -29.1681, lng: -51.1792 }; // Coordenadas de Caxias do Sul
  zoom = 13;

  icon = 'assets/icone_ecoponto2.png';

  markers: google.maps.LatLngLiteral[] = [
    { lat: -29.167, lng: -51.179 },
    { lat: -29.170, lng: -51.181 },
    { lat: -29.17110, lng: -51.14016 },
    { lat: -29.17140, lng: -51.16764 },
    { lat: -29.16642, lng: -51.16557 },
    { lat: -29.16657, lng: -51.18574 },
    { lat: -29.13374, lng: -51.19270 }
  ];

  constructor(private ecopontoService: EcopontoService) { }

  ngOnInit(): void {
    this.filtrarEcopontos();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  filtrarEcopontos() {
    this.ecopontoService.filtrarEcopontos("")
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
