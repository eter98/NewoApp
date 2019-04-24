import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CuentaAsociada } from 'app/shared/model/cuenta-asociada.model';
import { CuentaAsociadaService } from './cuenta-asociada.service';
import { CuentaAsociadaComponent } from './cuenta-asociada.component';
import { CuentaAsociadaDetailComponent } from './cuenta-asociada-detail.component';
import { CuentaAsociadaUpdateComponent } from './cuenta-asociada-update.component';
import { CuentaAsociadaDeletePopupComponent } from './cuenta-asociada-delete-dialog.component';
import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

@Injectable({ providedIn: 'root' })
export class CuentaAsociadaResolve implements Resolve<ICuentaAsociada> {
    constructor(private service: CuentaAsociadaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICuentaAsociada> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CuentaAsociada>) => response.ok),
                map((cuentaAsociada: HttpResponse<CuentaAsociada>) => cuentaAsociada.body)
            );
        }
        return of(new CuentaAsociada());
    }
}

export const cuentaAsociadaRoute: Routes = [
    {
        path: '',
        component: CuentaAsociadaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.cuentaAsociada.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CuentaAsociadaDetailComponent,
        resolve: {
            cuentaAsociada: CuentaAsociadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.cuentaAsociada.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CuentaAsociadaUpdateComponent,
        resolve: {
            cuentaAsociada: CuentaAsociadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.cuentaAsociada.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CuentaAsociadaUpdateComponent,
        resolve: {
            cuentaAsociada: CuentaAsociadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.cuentaAsociada.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cuentaAsociadaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CuentaAsociadaDeletePopupComponent,
        resolve: {
            cuentaAsociada: CuentaAsociadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.cuentaAsociada.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
