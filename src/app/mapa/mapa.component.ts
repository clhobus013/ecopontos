import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  icons: Record<string, { icon: string }> = {
    point1: {
      icon: 'assets/icone_ecoponto1.png'
    },
    point2: {
      icon: 'assets/icone_ecoponto2.png'
    }
  };

  markers: google.maps.LatLngLiteral[] = [
    { lat: -29.167, lng: -51.179 }, // Coordenadas primeiro ponto
    { lat: -29.170, lng: -51.181 }  // Coordenadas segundo ponto
  ];

  constructor() { }

  ngOnInit(): void {
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

}
