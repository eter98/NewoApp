import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductosServicios } from 'app/shared/model/productos-servicios.model';
import { AccountService } from 'app/core';
import { ProductosServiciosService } from './productos-servicios.service';

@Component({
    selector: 'jhi-productos-servicios',
    templateUrl: './productos-servicios.component.html'
})
export class ProductosServiciosComponent implements OnInit, OnDestroy {
    productosServicios: IProductosServicios[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected productosServiciosService: ProductosServiciosService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.productosServiciosService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IProductosServicios[]>) => res.ok),
                    map((res: HttpResponse<IProductosServicios[]>) => res.body)
                )
                .subscribe(
                    (res: IProductosServicios[]) => (this.productosServicios = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.productosServiciosService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductosServicios[]>) => res.ok),
                map((res: HttpResponse<IProductosServicios[]>) => res.body)
            )
            .subscribe(
                (res: IProductosServicios[]) => {
                    this.productosServicios = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductosServicios) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInProductosServicios() {
        this.eventSubscriber = this.eventManager.subscribe('productosServiciosListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
