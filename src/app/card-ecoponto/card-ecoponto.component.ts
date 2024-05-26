import { Component, Input, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Ecoponto } from '../models/ecoponto';

@Component({
  selector: 'app-card-ecoponto',
  templateUrl: './card-ecoponto.component.html',
  styleUrls: ['./card-ecoponto.component.scss']
})
export class CardEcopontoComponent implements OnInit {
  @Input() ecoponto: Ecoponto|undefined = undefined;

  faTrash = faTrash;
  faPen = faPen;

  constructor() { }

  ngOnInit(): void {}

}
