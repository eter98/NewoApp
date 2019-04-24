import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { EntradaInvitadosService } from './entrada-invitados.service';
import { EntradaInvitadosComponent } from './entrada-invitados.component';
import { EntradaInvitadosDetailComponent } from './entrada-invitados-detail.component';
import { EntradaInvitadosUpdateComponent } from './entrada-invitados-update.component';
import { EntradaInvitadosDeletePopupComponent } from './entrada-invitados-delete-dialog.component';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';

@Injectable({ providedIn: 'root' })
export class EntradaInvitadosResolve implements Resolve<IEntradaInvitados> {
    constructor(private service: EntradaInvitadosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEntradaInvitados> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EntradaInvitados>) => response.ok),
                map((entradaInvitados: HttpResponse<EntradaInvitados>) => entradaInvitados.body)
            );
        }
        return of(new EntradaInvitados());
    }
}

export const entradaInvitadosRoute: Routes = [
    {
        path: '',
        component: EntradaInvitadosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaInvitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EntradaInvitadosDetailComponent,
        resolve: {
            entradaInvitados: EntradaInvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaInvitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EntradaInvitadosUpdateComponent,
        resolve: {
            entradaInvitados: EntradaInvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaInvitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EntradaInvitadosUpdateComponent,
        resolve: {
            entradaInvitados: EntradaInvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaInvitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entradaInvitadosPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EntradaInvitadosDeletePopupComponent,
        resolve: {
            entradaInvitados: EntradaInvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaInvitados.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
