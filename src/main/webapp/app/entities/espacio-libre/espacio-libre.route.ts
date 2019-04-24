import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from './espacio-libre.service';
import { EspacioLibreComponent } from './espacio-libre.component';
import { EspacioLibreDetailComponent } from './espacio-libre-detail.component';
import { EspacioLibreUpdateComponent } from './espacio-libre-update.component';
import { EspacioLibreDeletePopupComponent } from './espacio-libre-delete-dialog.component';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';

@Injectable({ providedIn: 'root' })
export class EspacioLibreResolve implements Resolve<IEspacioLibre> {
    constructor(private service: EspacioLibreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEspacioLibre> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EspacioLibre>) => response.ok),
                map((espacioLibre: HttpResponse<EspacioLibre>) => espacioLibre.body)
            );
        }
        return of(new EspacioLibre());
    }
}

export const espacioLibreRoute: Routes = [
    {
        path: '',
        component: EspacioLibreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espacioLibre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EspacioLibreDetailComponent,
        resolve: {
            espacioLibre: EspacioLibreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espacioLibre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EspacioLibreUpdateComponent,
        resolve: {
            espacioLibre: EspacioLibreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espacioLibre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EspacioLibreUpdateComponent,
        resolve: {
            espacioLibre: EspacioLibreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espacioLibre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const espacioLibrePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EspacioLibreDeletePopupComponent,
        resolve: {
            espacioLibre: EspacioLibreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.espacioLibre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
