import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EntradaMiembros } from 'app/shared/model/entrada-miembros.model';
import { EntradaMiembrosService } from './entrada-miembros.service';
import { EntradaMiembrosComponent } from './entrada-miembros.component';
import { EntradaMiembrosDetailComponent } from './entrada-miembros-detail.component';
import { EntradaMiembrosUpdateComponent } from './entrada-miembros-update.component';
import { EntradaMiembrosDeletePopupComponent } from './entrada-miembros-delete-dialog.component';
import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';

@Injectable({ providedIn: 'root' })
export class EntradaMiembrosResolve implements Resolve<IEntradaMiembros> {
    constructor(private service: EntradaMiembrosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEntradaMiembros> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EntradaMiembros>) => response.ok),
                map((entradaMiembros: HttpResponse<EntradaMiembros>) => entradaMiembros.body)
            );
        }
        return of(new EntradaMiembros());
    }
}

export const entradaMiembrosRoute: Routes = [
    {
        path: '',
        component: EntradaMiembrosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaMiembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EntradaMiembrosDetailComponent,
        resolve: {
            entradaMiembros: EntradaMiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaMiembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EntradaMiembrosUpdateComponent,
        resolve: {
            entradaMiembros: EntradaMiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaMiembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EntradaMiembrosUpdateComponent,
        resolve: {
            entradaMiembros: EntradaMiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaMiembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entradaMiembrosPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EntradaMiembrosDeletePopupComponent,
        resolve: {
            entradaMiembros: EntradaMiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.entradaMiembros.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
