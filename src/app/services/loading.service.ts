import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class LoadingService {

    public isLoading: Subject<boolean> = new Subject<boolean>();

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }
    
}