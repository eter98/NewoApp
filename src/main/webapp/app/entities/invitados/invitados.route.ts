import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Invitados } from 'app/shared/model/invitados.model';
import { InvitadosService } from './invitados.service';
import { InvitadosComponent } from './invitados.component';
import { InvitadosDetailComponent } from './invitados-detail.component';
import { InvitadosUpdateComponent } from './invitados-update.component';
import { InvitadosDeletePopupComponent } from './invitados-delete-dialog.component';
import { IInvitados } from 'app/shared/model/invitados.model';

@Injectable({ providedIn: 'root' })
export class InvitadosResolve implements Resolve<IInvitados> {
    constructor(private service: InvitadosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInvitados> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Invitados>) => response.ok),
                map((invitados: HttpResponse<Invitados>) => invitados.body)
            );
        }
        return of(new Invitados());
    }
}

export const invitadosRoute: Routes = [
    {
        path: '',
        component: InvitadosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.invitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: InvitadosDetailComponent,
        resolve: {
            invitados: InvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.invitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: InvitadosUpdateComponent,
        resolve: {
            invitados: InvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.invitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: InvitadosUpdateComponent,
        resolve: {
            invitados: InvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.invitados.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invitadosPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: InvitadosDeletePopupComponent,
        resolve: {
            invitados: InvitadosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.invitados.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
