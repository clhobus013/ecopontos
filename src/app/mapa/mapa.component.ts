import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})

export class MapaComponent implements OnInit {
  
  display: google.maps.LatLngLiteral|null = null;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  
  constructor() { }

  ngOnInit(): void {
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = (event.latLng?.toJSON());
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng?.toJSON();
    }
  }

}
