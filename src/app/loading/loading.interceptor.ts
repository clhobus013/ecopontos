import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "../services/loading.service";
import { Observable, finalize } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(public loadingService: LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(req).pipe(finalize(() => {this.loadingService.hide()}));
    }
}