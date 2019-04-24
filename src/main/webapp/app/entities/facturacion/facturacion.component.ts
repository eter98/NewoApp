import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFacturacion } from 'app/shared/model/facturacion.model';
import { AccountService } from 'app/core';
import { FacturacionService } from './facturacion.service';

@Component({
    selector: 'jhi-facturacion',
    templateUrl: './facturacion.component.html'
})
export class FacturacionComponent implements OnInit, OnDestroy {
    facturacions: IFacturacion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected facturacionService: FacturacionService,
        protected jhiAlertService: JhiAlertService,
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
            this.facturacionService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IFacturacion[]>) => res.ok),
                    map((res: HttpResponse<IFacturacion[]>) => res.body)
                )
                .subscribe((res: IFacturacion[]) => (this.facturacions = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.facturacionService
            .query()
            .pipe(
                filter((res: HttpResponse<IFacturacion[]>) => res.ok),
                map((res: HttpResponse<IFacturacion[]>) => res.body)
            )
            .subscribe(
                (res: IFacturacion[]) => {
                    this.facturacions = res;
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
        this.registerChangeInFacturacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFacturacion) {
        return item.id;
    }

    registerChangeInFacturacions() {
        this.eventSubscriber = this.eventManager.subscribe('facturacionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
