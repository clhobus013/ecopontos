import import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { OverlappingMarkerSpiderfier } from 'overlapping-marker-spiderfier';
import { MarkerClusterer, MarkerClustererOptions } from "@googlemaps/markerclusterer";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, AfterViewInit {
  private wasteCollectionPointsLoadedSubject = new Subject<void>();
  wasteCollectionPointsLoaded$ = this.wasteCollectionPointsLoadedSubject.asObservable();

  constructor() { }

  ngOnInit(): void {
  }

  @Output() public viewRedirect = new EventEmitter<any>();
  @Output() public mapBoundsChange = new EventEmitter<any>();
  @Input() wasteCollectionPoints: any[] = [];

  @ViewChild('map') mapElement: any;
  public map: google.maps.Map;
  public markers: google.maps.Marker[] = [];
  public markerCluster: MarkerClusterer;
  public spiderfier: OverlappingMarkerSpiderfier;

  public lng = -51.1690401;
  public lat = -29.1671844;

  ngAfterViewInit(): void {
    const mapProperties: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'greedy',
      mapTypeControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    this.wasteCollectionPointsLoaded$.subscribe(() => {
      if (this.markers && this.markers.length > 0) {
        this.resetMarkers();
      }

      this.markers = this.wasteCollectionPoints.map(wasteCollectionPoint => {
        let latLng = new google.maps.LatLng(wasteCollectionPoint.lat_address, wasteCollectionPoint.long_address);
        return new google.maps.Marker({
          position: latLng,
          title: wasteCollectionPoint.title,
          icon: "../../../../assets/icone_local.png",
          optimized: true,
          cursor: wasteCollectionPoint.id.toString()
        });
      });

      this.markers.forEach((marker) => {
        const infowindow = new google.maps.InfoWindow();
        marker.addListener("click", () => {
          let wasteCollectionPoint = this.wasteCollectionPoints.find(x => x.id.toString() == marker.getCursor());
          infowindow.open({
            anchor: marker,
            map: this.map,
            shouldFocus: true,
          });
          var content = `
            <div class="info-window" style="padding: 10px;">
              <div class="wasteCollectionPoint-details"
                style="
                  display: flex;
                  flex-direction: row;
                " >
                <img src="${wasteCollectionPoint.company_logo}" class="company-logo"
                  style="
                    width: 80px;
                    height: 100%;
                    margin-right: 6px;
                  " />
                <div class="wasteCollectionPoint-wrapper"
                  style="
                    display: flex;
                    flex-direction: column;
                  " >
                  <p class="wasteCollectionPoint-title"
                    style="
                      font-size: 18px;
                      font-weight: 700;
                      justify-content: flex-start;
                      margin-bottom: 0;
                    " >${wasteCollectionPoint.title}</p>
                  <p class="company-name"
                    style="
                      font-size 15px;
                    " >
                    ${wasteCollectionPoint.company_name}
                  </p>
                </div>
              </div>
              <div class="buttons-container"
                style="
                  display: flex;
                  justify-content: flex-end;
                " >
                <ng-container>
                  <a id="details-link" class="btn btn-attention purple-link pull-right"
                    style="
                      color: white;
                      width: 50%;
                      font-weight: bold;
                      min-width: 150px;
                      max-width: 250px;
                      background-color: var(--main-color);
                    " >
                    Detalhes
                    <i class="fa fa-angle-double-right"></i>
                  </a>
                </ng-container>
              </div>
            </div>`;
          infowindow.setContent(content);

          setTimeout(() => {
            document.getElementById('details-link').addEventListener('click', () => {
              if (this.companyView) {
                this.viewRedirect.emit();
                let url = this.router.serializeUrl(
                  this.router.createUrlTree(['/wasteCollectionPoint/' + wasteCollectionPoint.id])
                );
                window.open(url, "_blank");
              } else {
                this.navigateTowasteCollectionPoint(wasteCollectionPoint.id, wasteCollectionPoint.url, wasteCollectionPoint.internal);
              }
            });
          }, 200);
        });
      });

      this.markerCluster = new MarkerClusterer(
        this.map,
        this.markers,
        {
          maxZoom: 14,
          // imagePath: "../../../../assets/m"
        } as MarkerClustererOptions
      );

      this.spiderfier = new OverlappingMarkerSpiderfier(
        this.map,
        {
          markersWontMove: true,
          markersWontHide: true,
          keepSpiderfied: true,
          circleSpiralSwitchover: 20,
          spiderfiedShadowColor: 'grey',
          // nudgeRadius: 2,
          nudgeStackedMarkers: false,
          minZoomLevel: 15
        }
      );
      this.markers.forEach((marker) => {
        this.spiderfier.addMarker(marker);
      })
    });

    this.map.addListener('bounds_changed', () => {
      let northEst = { lng: this.map.getBounds().getNorthEast().lng(), lat: this.map.getBounds().getNorthEast().lat() };
      let southWest = { lng: this.map.getBounds().getSouthWest().lng(), lat: this.map.getBounds().getSouthWest().lat() };
      this.mapBoundsChange.emit({ northEst: northEst, southWest: southWest });
    });
  }

  loadWasteCollectionPoints() {
    this.wasteCollectionPointsLoadedSubject.next();
  }

  private resetMarkers(): void {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers.length = 0;
    this.markerCluster.clearMarkers();
  }

  onClickMarker(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
}


//  modelo da nova versão da biblioteca para teste em: https://developers.google.com/maps/documentation/javascript/marker-clustering?hl=pt-br#cdn
//  function initMap(): void {
//   const map = new google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       zoom: 3,
//       center: { lat: -28.024, lng: 140.887 },
//     }
//   );

//   const infoWindow = new google.maps.InfoWindow({
//     content: "",
//     disableAutoPan: true,
//   });

//   // Create an array of alphabetical characters used to label the markers.
//   const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//   // Add some markers to the map.
//   const markers = locations.map((position, i) => {
//     const label = labels[i % labels.length];
//     const marker = new google.maps.Marker({
//       position,
//       label,
//     });

//     // markers can only be keyboard focusable when they have click listeners
//     // open info window when marker is clicked
//     marker.addListener("click", () => {
//       infoWindow.setContent(label);
//       infoWindow.open(map, marker);
//     });

//     return marker;
//   });

//   // Add a marker clusterer to manage the markers.
//   new MarkerClusterer({ markers, map });
// }

// const locations = [
//   { lat: -31.56391, lng: 147.154312 },
//   { lat: -33.718234, lng: 150.363181 },
//   { lat: -33.727111, lng: 150.371124 },
//   { lat: -33.848588, lng: 151.209834 },
//   { lat: -33.851702, lng: 151.216968 },
//   { lat: -34.671264, lng: 150.863657 },
//   { lat: -35.304724, lng: 148.662905 },
//   { lat: -36.817685, lng: 175.699196 },
//   { lat: -36.828611, lng: 175.790222 },
//   { lat: -37.75, lng: 145.116667 },
//   { lat: -37.759859, lng: 145.128708 },
//   { lat: -37.765015, lng: 145.133858 },
//   { lat: -37.770104, lng: 145.143299 },
//   { lat: -37.7737, lng: 145.145187 },
//   { lat: -37.774785, lng: 145.137978 },
//   { lat: -37.819616, lng: 144.968119 },
//   { lat: -38.330766, lng: 144.695692 },
//   { lat: -39.927193, lng: 175.053218 },
//   { lat: -41.330162, lng: 174.865694 },
//   { lat: -42.734358, lng: 147.439506 },
//   { lat: -42.734358, lng: 147.501315 },
//   { lat: -42.735258, lng: 147.438 },
//   { lat: -43.999792, lng: 170.463352 },
// ];
