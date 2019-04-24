import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { EspaciosReservaService } from './espacios-reserva.service';
import { EspaciosReservaComponent } from './espacios-reserva.component';
import { EspaciosReservaDetailComponent } from './espacios-reserva-detail.component';
import { EspaciosReservaUpdateComponent } from './espacios-reserva-update.component';
import { EspaciosReservaDeletePopupComponent } from './espacios-reserva-delete-dialog.component';
import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';

@Injectable({ providedIn: 'root' })
export class EspaciosReservaResolve implements Resolve<IEspaciosReserva> {
    constructor(private service: EspaciosReservaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEspaciosReserva> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EspaciosReserva>) => response.ok),
                map((espaciosReserva: HttpResponse<EspaciosReserva>) => espaciosReserva.body)
            );
        }
        return of(new EspaciosReserva());
    }
}

export const espaciosReservaRoute: Routes = [
    {
        path: '',
        component: EspaciosReservaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espaciosReserva.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EspaciosReservaDetailComponent,
        resolve: {
            espaciosReserva: EspaciosReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espaciosReserva.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EspaciosReservaUpdateComponent,
        resolve: {
            espaciosReserva: EspaciosReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espaciosReserva.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EspaciosReservaUpdateComponent,
        resolve: {
            espaciosReserva: EspaciosReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espaciosReserva.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const espaciosReservaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EspaciosReservaDeletePopupComponent,
        resolve: {
            espaciosReserva: EspaciosReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espaciosReserva.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
