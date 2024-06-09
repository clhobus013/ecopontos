import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  template: '<ngx-loading [show]="(loading | async) || false"></ngx-loading>'
})

export class LoadingComponent {

  public loading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService) { }
  
}
