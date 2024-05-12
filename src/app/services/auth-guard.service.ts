import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Permissoes } from "../models/Permissoes";
import { Toast, ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private router: Router, private toast: ToastrService) {}
    
    public canActivate(activated: ActivatedRouteSnapshot):  Observable<boolean> {
        return this.checarRota(activated);
    }

    public canActivateChild(activated: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checarRota(activated);
    }

    protected checarRota(activated: ActivatedRouteSnapshot): Observable<boolean> {

        console.log(" >> CHECAR ROTA << ", activated);

        if (activated.routeConfig?.path == "ecoponto") {

            const empresaId = localStorage.getItem('empresaId');

            return new Observable<boolean>(subscriber => {
                if (!empresaId) {
                    subscriber.next(false);
                    this.toast.error('Primeiro faça o cadastro da empresa', 'Acesso negado', {
                        timeOut: 1500,
                        positionClass: 'toast-bottom-right'
                    });
                    this.router.navigate(['/cadastro/empresa']);
                } else {
                    subscriber.next(true);
                }
            })
        }

        if (activated.routeConfig?.path == "horario") {

            const ecopontoId = localStorage.getItem('ecopontoId');

            return new Observable<boolean>(subscriber => {
                if (!ecopontoId) {
                    subscriber.next(false);
                    this.toast.error('Primeiro faça o cadastro do ecoponto', 'Acesso negado', {
                        timeOut: 1500,
                        positionClass: 'toast-bottom-right'
                    });
                    this.router.navigate(['/cadastro/ecoponto']);
                } else {
                    subscriber.next(true);
                }
            })
        }

        if (typeof activated.data['rules'] !== 'undefined' && activated.data['rules'].length) {
            const rulesRota = activated.data['rules'];
            const rulesUsuario = localStorage.getItem('rulesUsuario');
            const rules = JSON.parse(rulesUsuario ? rulesUsuario : '');

            return new Observable<boolean>(subscriber => {
                if (!Permissoes.temPermissao(rulesRota, rules)) {
                    subscriber.next(false);
                    this.router.navigate(['/acesso-negado']);
                } else {
                    subscriber.next(true);
                }
            })
        }

        return new Observable<true>;
    }
}