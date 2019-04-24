import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Sedes } from 'app/shared/model/sedes.model';
import { SedesService } from './sedes.service';
import { SedesComponent } from './sedes.component';
import { SedesDetailComponent } from './sedes-detail.component';
import { SedesUpdateComponent } from './sedes-update.component';
import { SedesDeletePopupComponent } from './sedes-delete-dialog.component';
import { ISedes } from 'app/shared/model/sedes.model';

@Injectable({ providedIn: 'root' })
export class SedesResolve implements Resolve<ISedes> {
    constructor(private service: SedesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISedes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Sedes>) => response.ok),
                map((sedes: HttpResponse<Sedes>) => sedes.body)
            );
        }
        return of(new Sedes());
    }
}

export const sedesRoute: Routes = [
    {
        path: '',
        component: SedesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.sedes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SedesDetailComponent,
        resolve: {
            sedes: SedesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.sedes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SedesUpdateComponent,
        resolve: {
            sedes: SedesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.sedes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SedesUpdateComponent,
        resolve: {
            sedes: SedesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.sedes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sedesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SedesDeletePopupComponent,
        resolve: {
            sedes: SedesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.sedes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
