import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EquipoEmpresas } from 'app/shared/model/equipo-empresas.model';
import { EquipoEmpresasService } from './equipo-empresas.service';
import { EquipoEmpresasComponent } from './equipo-empresas.component';
import { EquipoEmpresasDetailComponent } from './equipo-empresas-detail.component';
import { EquipoEmpresasUpdateComponent } from './equipo-empresas-update.component';
import { EquipoEmpresasDeletePopupComponent } from './equipo-empresas-delete-dialog.component';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

@Injectable({ providedIn: 'root' })
export class EquipoEmpresasResolve implements Resolve<IEquipoEmpresas> {
    constructor(private service: EquipoEmpresasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEquipoEmpresas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EquipoEmpresas>) => response.ok),
                map((equipoEmpresas: HttpResponse<EquipoEmpresas>) => equipoEmpresas.body)
            );
        }
        return of(new EquipoEmpresas());
    }
}

export const equipoEmpresasRoute: Routes = [
    {
        path: '',
        component: EquipoEmpresasComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.equipoEmpresas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EquipoEmpresasDetailComponent,
        resolve: {
            equipoEmpresas: EquipoEmpresasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.equipoEmpresas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EquipoEmpresasUpdateComponent,
        resolve: {
            equipoEmpresas: EquipoEmpresasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.equipoEmpresas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EquipoEmpresasUpdateComponent,
        resolve: {
            equipoEmpresas: EquipoEmpresasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.equipoEmpresas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const equipoEmpresasPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EquipoEmpresasDeletePopupComponent,
        resolve: {
            equipoEmpresas: EquipoEmpresasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.equipoEmpresas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
