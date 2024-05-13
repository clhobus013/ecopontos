import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  aberto = true;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleNavBar() {
    this.aberto = !this.aberto;
  }

}
