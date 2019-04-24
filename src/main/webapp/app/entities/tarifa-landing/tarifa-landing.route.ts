import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TarifaLanding } from 'app/shared/model/tarifa-landing.model';
import { TarifaLandingService } from './tarifa-landing.service';
import { TarifaLandingComponent } from './tarifa-landing.component';
import { TarifaLandingDetailComponent } from './tarifa-landing-detail.component';
import { TarifaLandingUpdateComponent } from './tarifa-landing-update.component';
import { TarifaLandingDeletePopupComponent } from './tarifa-landing-delete-dialog.component';
import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';

@Injectable({ providedIn: 'root' })
export class TarifaLandingResolve implements Resolve<ITarifaLanding> {
    constructor(private service: TarifaLandingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITarifaLanding> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TarifaLanding>) => response.ok),
                map((tarifaLanding: HttpResponse<TarifaLanding>) => tarifaLanding.body)
            );
        }
        return of(new TarifaLanding());
    }
}

export const tarifaLandingRoute: Routes = [
    {
        path: '',
        component: TarifaLandingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.tarifaLanding.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TarifaLandingDetailComponent,
        resolve: {
            tarifaLanding: TarifaLandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.tarifaLanding.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TarifaLandingUpdateComponent,
        resolve: {
            tarifaLanding: TarifaLandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.tarifaLanding.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TarifaLandingUpdateComponent,
        resolve: {
            tarifaLanding: TarifaLandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.tarifaLanding.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tarifaLandingPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TarifaLandingDeletePopupComponent,
        resolve: {
            tarifaLanding: TarifaLandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.tarifaLanding.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
