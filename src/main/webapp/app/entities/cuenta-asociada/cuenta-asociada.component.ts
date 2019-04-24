import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';
import { AccountService } from 'app/core';
import { CuentaAsociadaService } from './cuenta-asociada.service';

@Component({
    selector: 'jhi-cuenta-asociada',
    templateUrl: './cuenta-asociada.component.html'
})
export class CuentaAsociadaComponent implements OnInit, OnDestroy {
    cuentaAsociadas: ICuentaAsociada[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected cuentaAsociadaService: CuentaAsociadaService,
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
            this.cuentaAsociadaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ICuentaAsociada[]>) => res.ok),
                    map((res: HttpResponse<ICuentaAsociada[]>) => res.body)
                )
                .subscribe((res: ICuentaAsociada[]) => (this.cuentaAsociadas = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.cuentaAsociadaService
            .query()
            .pipe(
                filter((res: HttpResponse<ICuentaAsociada[]>) => res.ok),
                map((res: HttpResponse<ICuentaAsociada[]>) => res.body)
            )
            .subscribe(
                (res: ICuentaAsociada[]) => {
                    this.cuentaAsociadas = res;
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
        this.registerChangeInCuentaAsociadas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICuentaAsociada) {
        return item.id;
    }

    registerChangeInCuentaAsociadas() {
        this.eventSubscriber = this.eventManager.subscribe('cuentaAsociadaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
