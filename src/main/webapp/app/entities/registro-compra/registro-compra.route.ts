import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RegistroCompra } from 'app/shared/model/registro-compra.model';
import { RegistroCompraService } from './registro-compra.service';
import { RegistroCompraComponent } from './registro-compra.component';
import { RegistroCompraDetailComponent } from './registro-compra-detail.component';
import { RegistroCompraUpdateComponent } from './registro-compra-update.component';
import { RegistroCompraDeletePopupComponent } from './registro-compra-delete-dialog.component';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';

@Injectable({ providedIn: 'root' })
export class RegistroCompraResolve implements Resolve<IRegistroCompra> {
    constructor(private service: RegistroCompraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRegistroCompra> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RegistroCompra>) => response.ok),
                map((registroCompra: HttpResponse<RegistroCompra>) => registroCompra.body)
            );
        }
        return of(new RegistroCompra());
    }
}

export const registroCompraRoute: Routes = [
    {
        path: '',
        component: RegistroCompraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.registroCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RegistroCompraDetailComponent,
        resolve: {
            registroCompra: RegistroCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.registroCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RegistroCompraUpdateComponent,
        resolve: {
            registroCompra: RegistroCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.registroCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RegistroCompraUpdateComponent,
        resolve: {
            registroCompra: RegistroCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.registroCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registroCompraPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RegistroCompraDeletePopupComponent,
        resolve: {
            registroCompra: RegistroCompraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.registroCompra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
