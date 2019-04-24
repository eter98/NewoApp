import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPais } from 'app/shared/model/pais.model';
import { AccountService } from 'app/core';
import { PaisService } from './pais.service';

@Component({
    selector: 'jhi-pais',
    templateUrl: './pais.component.html'
})
export class PaisComponent implements OnInit, OnDestroy {
    pais: IPais[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected paisService: PaisService,
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
            this.paisService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IPais[]>) => res.ok),
                    map((res: HttpResponse<IPais[]>) => res.body)
                )
                .subscribe((res: IPais[]) => (this.pais = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.paisService
            .query()
            .pipe(
                filter((res: HttpResponse<IPais[]>) => res.ok),
                map((res: HttpResponse<IPais[]>) => res.body)
            )
            .subscribe(
                (res: IPais[]) => {
                    this.pais = res;
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
        this.registerChangeInPais();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPais) {
        return item.id;
    }

    registerChangeInPais() {
        this.eventSubscriber = this.eventManager.subscribe('paisListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
