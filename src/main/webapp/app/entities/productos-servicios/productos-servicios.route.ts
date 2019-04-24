import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductosServicios } from 'app/shared/model/productos-servicios.model';
import { ProductosServiciosService } from './productos-servicios.service';
import { ProductosServiciosComponent } from './productos-servicios.component';
import { ProductosServiciosDetailComponent } from './productos-servicios-detail.component';
import { ProductosServiciosUpdateComponent } from './productos-servicios-update.component';
import { ProductosServiciosDeletePopupComponent } from './productos-servicios-delete-dialog.component';
import { IProductosServicios } from 'app/shared/model/productos-servicios.model';

@Injectable({ providedIn: 'root' })
export class ProductosServiciosResolve implements Resolve<IProductosServicios> {
    constructor(private service: ProductosServiciosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductosServicios> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductosServicios>) => response.ok),
                map((productosServicios: HttpResponse<ProductosServicios>) => productosServicios.body)
            );
        }
        return of(new ProductosServicios());
    }
}

export const productosServiciosRoute: Routes = [
    {
        path: '',
        component: ProductosServiciosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.productosServicios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductosServiciosDetailComponent,
        resolve: {
            productosServicios: ProductosServiciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.productosServicios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductosServiciosUpdateComponent,
        resolve: {
            productosServicios: ProductosServiciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.productosServicios.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductosServiciosUpdateComponent,
        resolve: {
            productosServicios: ProductosServiciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.productosServicios.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productosServiciosPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductosServiciosDeletePopupComponent,
        resolve: {
            productosServicios: ProductosServiciosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newoApp.productosServicios.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
