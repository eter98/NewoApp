import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reservas } from 'app/shared/model/reservas.model';
import { ReservasService } from './reservas.service';
import { ReservasComponent } from './reservas.component';
import { ReservasDetailComponent } from './reservas-detail.component';
import { ReservasUpdateComponent } from './reservas-update.component';
import { ReservasDeletePopupComponent } from './reservas-delete-dialog.component';
import { IReservas } from 'app/shared/model/reservas.model';

@Injectable({ providedIn: 'root' })
export class ReservasResolve implements Resolve<IReservas> {
    constructor(private service: ReservasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReservas> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Reservas>) => response.ok),
                map((reservas: HttpResponse<Reservas>) => reservas.body)
            );
        }
        return of(new Reservas());
    }
}

export const reservasRoute: Routes = [
    {
        path: '',
        component: ReservasComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.reservas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReservasDetailComponent,
        resolve: {
            reservas: ReservasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.reservas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ReservasUpdateComponent,
        resolve: {
            reservas: ReservasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.reservas.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReservasUpdateComponent,
        resolve: {
            reservas: ReservasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.reservas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reservasPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ReservasDeletePopupComponent,
        resolve: {
            reservas: ReservasResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.reservas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
