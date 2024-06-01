import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnChanges {
  @Input() show: boolean = false;

  show1: boolean = false;
  show2: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["show"].currentValue) {
      setTimeout(()=> this.show1 = true, 20)
      setTimeout(()=> this.show2 = true, 40)
    }
  }

}
