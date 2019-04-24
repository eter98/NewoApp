import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HostSede } from 'app/shared/model/host-sede.model';
import { HostSedeService } from './host-sede.service';
import { HostSedeComponent } from './host-sede.component';
import { HostSedeDetailComponent } from './host-sede-detail.component';
import { HostSedeUpdateComponent } from './host-sede-update.component';
import { HostSedeDeletePopupComponent } from './host-sede-delete-dialog.component';
import { IHostSede } from 'app/shared/model/host-sede.model';

@Injectable({ providedIn: 'root' })
export class HostSedeResolve implements Resolve<IHostSede> {
    constructor(private service: HostSedeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHostSede> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HostSede>) => response.ok),
                map((hostSede: HttpResponse<HostSede>) => hostSede.body)
            );
        }
        return of(new HostSede());
    }
}

export const hostSedeRoute: Routes = [
    {
        path: '',
        component: HostSedeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.hostSede.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HostSedeDetailComponent,
        resolve: {
            hostSede: HostSedeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.hostSede.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HostSedeUpdateComponent,
        resolve: {
            hostSede: HostSedeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.hostSede.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HostSedeUpdateComponent,
        resolve: {
            hostSede: HostSedeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.hostSede.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hostSedePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HostSedeDeletePopupComponent,
        resolve: {
            hostSede: HostSedeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.hostSede.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
