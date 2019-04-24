import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ciudad } from 'app/shared/model/ciudad.model';
import { CiudadService } from './ciudad.service';
import { CiudadComponent } from './ciudad.component';
import { CiudadDetailComponent } from './ciudad-detail.component';
import { CiudadUpdateComponent } from './ciudad-update.component';
import { CiudadDeletePopupComponent } from './ciudad-delete-dialog.component';
import { ICiudad } from 'app/shared/model/ciudad.model';

@Injectable({ providedIn: 'root' })
export class CiudadResolve implements Resolve<ICiudad> {
    constructor(private service: CiudadService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICiudad> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ciudad>) => response.ok),
                map((ciudad: HttpResponse<Ciudad>) => ciudad.body)
            );
        }
        return of(new Ciudad());
    }
}

export const ciudadRoute: Routes = [
    {
        path: '',
        component: CiudadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CiudadDetailComponent,
        resolve: {
            ciudad: CiudadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CiudadUpdateComponent,
        resolve: {
            ciudad: CiudadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CiudadUpdateComponent,
        resolve: {
            ciudad: CiudadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ciudadPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CiudadDeletePopupComponent,
        resolve: {
            ciudad: CiudadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
