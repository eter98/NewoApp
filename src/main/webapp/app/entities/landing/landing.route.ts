import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Landing } from 'app/shared/model/landing.model';
import { LandingService } from './landing.service';
import { LandingComponent } from './landing.component';
import { LandingDetailComponent } from './landing-detail.component';
import { LandingUpdateComponent } from './landing-update.component';
import { LandingDeletePopupComponent } from './landing-delete-dialog.component';
import { ILanding } from 'app/shared/model/landing.model';

@Injectable({ providedIn: 'root' })
export class LandingResolve implements Resolve<ILanding> {
    constructor(private service: LandingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILanding> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Landing>) => response.ok),
                map((landing: HttpResponse<Landing>) => landing.body)
            );
        }
        return of(new Landing());
    }
}

export const landingRoute: Routes = [
    {
        path: '',
        component: LandingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.landing.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LandingDetailComponent,
        resolve: {
            landing: LandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.landing.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LandingUpdateComponent,
        resolve: {
            landing: LandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.landing.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LandingUpdateComponent,
        resolve: {
            landing: LandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.landing.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const landingPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LandingDeletePopupComponent,
        resolve: {
            landing: LandingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.landing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
