import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';
import { AccountService } from 'app/core';
import { EntradaMiembrosService } from './entrada-miembros.service';

@Component({
    selector: 'jhi-entrada-miembros',
    templateUrl: './entrada-miembros.component.html'
})
export class EntradaMiembrosComponent implements OnInit, OnDestroy {
    entradaMiembros: IEntradaMiembros[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected entradaMiembrosService: EntradaMiembrosService,
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
            this.entradaMiembrosService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IEntradaMiembros[]>) => res.ok),
                    map((res: HttpResponse<IEntradaMiembros[]>) => res.body)
                )
                .subscribe(
                    (res: IEntradaMiembros[]) => (this.entradaMiembros = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.entradaMiembrosService
            .query()
            .pipe(
                filter((res: HttpResponse<IEntradaMiembros[]>) => res.ok),
                map((res: HttpResponse<IEntradaMiembros[]>) => res.body)
            )
            .subscribe(
                (res: IEntradaMiembros[]) => {
                    this.entradaMiembros = res;
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
        this.registerChangeInEntradaMiembros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntradaMiembros) {
        return item.id;
    }

    registerChangeInEntradaMiembros() {
        this.eventSubscriber = this.eventManager.subscribe('entradaMiembrosListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
