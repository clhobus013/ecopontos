import { Component, OnInit } from '@angular/core';
import { faCoffee, faSoap, faXRay, faLaptopMedical, faWineBottle, faPills, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-residuo',
  templateUrl: './residuo.component.html',
  styleUrls: ['./residuo.component.scss']
})
export class ResiduoComponent implements OnInit {

  faCoffee = faCoffee;
  faSoap = faSoap;
  faXRay = faXRay;
  faLaptopMedical = faLaptopMedical;
  faWineBottle = faWineBottle;
  faPills = faPills;
  faBatteryEmpty = faBatteryEmpty;

  constructor() { }

  ngOnInit(): void {
  }

}
