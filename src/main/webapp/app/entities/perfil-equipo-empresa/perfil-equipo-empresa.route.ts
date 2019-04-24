import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';
import { PerfilEquipoEmpresaService } from './perfil-equipo-empresa.service';
import { PerfilEquipoEmpresaComponent } from './perfil-equipo-empresa.component';
import { PerfilEquipoEmpresaDetailComponent } from './perfil-equipo-empresa-detail.component';
import { PerfilEquipoEmpresaUpdateComponent } from './perfil-equipo-empresa-update.component';
import { PerfilEquipoEmpresaDeletePopupComponent } from './perfil-equipo-empresa-delete-dialog.component';
import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

@Injectable({ providedIn: 'root' })
export class PerfilEquipoEmpresaResolve implements Resolve<IPerfilEquipoEmpresa> {
    constructor(private service: PerfilEquipoEmpresaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPerfilEquipoEmpresa> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PerfilEquipoEmpresa>) => response.ok),
                map((perfilEquipoEmpresa: HttpResponse<PerfilEquipoEmpresa>) => perfilEquipoEmpresa.body)
            );
        }
        return of(new PerfilEquipoEmpresa());
    }
}

export const perfilEquipoEmpresaRoute: Routes = [
    {
        path: '',
        component: PerfilEquipoEmpresaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilEquipoEmpresa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PerfilEquipoEmpresaDetailComponent,
        resolve: {
            perfilEquipoEmpresa: PerfilEquipoEmpresaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilEquipoEmpresa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PerfilEquipoEmpresaUpdateComponent,
        resolve: {
            perfilEquipoEmpresa: PerfilEquipoEmpresaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilEquipoEmpresa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PerfilEquipoEmpresaUpdateComponent,
        resolve: {
            perfilEquipoEmpresa: PerfilEquipoEmpresaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilEquipoEmpresa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perfilEquipoEmpresaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PerfilEquipoEmpresaDeletePopupComponent,
        resolve: {
            perfilEquipoEmpresa: PerfilEquipoEmpresaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.perfilEquipoEmpresa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
