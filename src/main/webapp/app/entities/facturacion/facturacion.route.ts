import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Facturacion } from 'app/shared/model/facturacion.model';
import { FacturacionService } from './facturacion.service';
import { FacturacionComponent } from './facturacion.component';
import { FacturacionDetailComponent } from './facturacion-detail.component';
import { FacturacionUpdateComponent } from './facturacion-update.component';
import { FacturacionDeletePopupComponent } from './facturacion-delete-dialog.component';
import { IFacturacion } from 'app/shared/model/facturacion.model';

@Injectable({ providedIn: 'root' })
export class FacturacionResolve implements Resolve<IFacturacion> {
    constructor(private service: FacturacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacturacion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Facturacion>) => response.ok),
                map((facturacion: HttpResponse<Facturacion>) => facturacion.body)
            );
        }
        return of(new Facturacion());
    }
}

export const facturacionRoute: Routes = [
    {
        path: '',
        component: FacturacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.facturacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FacturacionDetailComponent,
        resolve: {
            facturacion: FacturacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.facturacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FacturacionUpdateComponent,
        resolve: {
            facturacion: FacturacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.facturacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FacturacionUpdateComponent,
        resolve: {
            facturacion: FacturacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.facturacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const facturacionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FacturacionDeletePopupComponent,
        resolve: {
            facturacion: FacturacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.facturacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
