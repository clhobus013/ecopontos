import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { faBatteryQuarter, faCoffee, faLaptopMedical, faPills, faSoap, faTrash, faWineBottle, faXRay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecopontos';

  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faSoap);
    library.addIcons(faCoffee);
    library.addIcons(faTrash);
    library.addIcons(faXRay);
    library.addIcons(faLaptopMedical);
    library.addIcons(faWineBottle);
    library.addIcons(faPills);
    library.addIcons(faBatteryQuarter);
  }  

}
