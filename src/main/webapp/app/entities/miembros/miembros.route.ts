import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Miembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from './miembros.service';
import { MiembrosComponent } from './miembros.component';
import { MiembrosDetailComponent } from './miembros-detail.component';
import { MiembrosUpdateComponent } from './miembros-update.component';
import { MiembrosDeletePopupComponent } from './miembros-delete-dialog.component';
import { IMiembros } from 'app/shared/model/miembros.model';

@Injectable({ providedIn: 'root' })
export class MiembrosResolve implements Resolve<IMiembros> {
    constructor(private service: MiembrosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMiembros> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Miembros>) => response.ok),
                map((miembros: HttpResponse<Miembros>) => miembros.body)
            );
        }
        return of(new Miembros());
    }
}

export const miembrosRoute: Routes = [
    {
        path: '',
        component: MiembrosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.miembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MiembrosDetailComponent,
        resolve: {
            miembros: MiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.miembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MiembrosUpdateComponent,
        resolve: {
            miembros: MiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.miembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MiembrosUpdateComponent,
        resolve: {
            miembros: MiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.miembros.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const miembrosPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MiembrosDeletePopupComponent,
        resolve: {
            miembros: MiembrosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.miembros.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
