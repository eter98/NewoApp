import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PerfilMiembro } from 'app/shared/model/perfil-miembro.model';
import { PerfilMiembroService } from './perfil-miembro.service';
import { PerfilMiembroComponent } from './perfil-miembro.component';
import { PerfilMiembroDetailComponent } from './perfil-miembro-detail.component';
import { PerfilMiembroUpdateComponent } from './perfil-miembro-update.component';
import { PerfilMiembroDeletePopupComponent } from './perfil-miembro-delete-dialog.component';
import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';

@Injectable({ providedIn: 'root' })
export class PerfilMiembroResolve implements Resolve<IPerfilMiembro> {
    constructor(private service: PerfilMiembroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPerfilMiembro> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PerfilMiembro>) => response.ok),
                map((perfilMiembro: HttpResponse<PerfilMiembro>) => perfilMiembro.body)
            );
        }
        return of(new PerfilMiembro());
    }
}

export const perfilMiembroRoute: Routes = [
    {
        path: '',
        component: PerfilMiembroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilMiembro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PerfilMiembroDetailComponent,
        resolve: {
            perfilMiembro: PerfilMiembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilMiembro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PerfilMiembroUpdateComponent,
        resolve: {
            perfilMiembro: PerfilMiembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilMiembro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PerfilMiembroUpdateComponent,
        resolve: {
            perfilMiembro: PerfilMiembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilMiembro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perfilMiembroPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PerfilMiembroDeletePopupComponent,
        resolve: {
            perfilMiembro: PerfilMiembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilMiembro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
