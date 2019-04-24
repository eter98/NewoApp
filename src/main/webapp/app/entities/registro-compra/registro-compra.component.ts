import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { AccountService } from 'app/core';
import { RegistroCompraService } from './registro-compra.service';

@Component({
    selector: 'jhi-registro-compra',
    templateUrl: './registro-compra.component.html'
})
export class RegistroCompraComponent implements OnInit, OnDestroy {
    registroCompras: IRegistroCompra[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected registroCompraService: RegistroCompraService,
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
            this.registroCompraService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IRegistroCompra[]>) => res.ok),
                    map((res: HttpResponse<IRegistroCompra[]>) => res.body)
                )
                .subscribe((res: IRegistroCompra[]) => (this.registroCompras = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.registroCompraService
            .query()
            .pipe(
                filter((res: HttpResponse<IRegistroCompra[]>) => res.ok),
                map((res: HttpResponse<IRegistroCompra[]>) => res.body)
            )
            .subscribe(
                (res: IRegistroCompra[]) => {
                    this.registroCompras = res;
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
        this.registerChangeInRegistroCompras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRegistroCompra) {
        return item.id;
    }

    registerChangeInRegistroCompras() {
        this.eventSubscriber = this.eventManager.subscribe('registroCompraListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
