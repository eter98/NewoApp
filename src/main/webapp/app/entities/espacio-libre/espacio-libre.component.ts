import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { AccountService } from 'app/core';
import { EspacioLibreService } from './espacio-libre.service';

@Component({
    selector: 'jhi-espacio-libre',
    templateUrl: './espacio-libre.component.html'
})
export class EspacioLibreComponent implements OnInit, OnDestroy {
    espacioLibres: IEspacioLibre[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected espacioLibreService: EspacioLibreService,
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
            this.espacioLibreService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IEspacioLibre[]>) => res.ok),
                    map((res: HttpResponse<IEspacioLibre[]>) => res.body)
                )
                .subscribe((res: IEspacioLibre[]) => (this.espacioLibres = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.espacioLibreService
            .query()
            .pipe(
                filter((res: HttpResponse<IEspacioLibre[]>) => res.ok),
                map((res: HttpResponse<IEspacioLibre[]>) => res.body)
            )
            .subscribe(
                (res: IEspacioLibre[]) => {
                    this.espacioLibres = res;
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
        this.registerChangeInEspacioLibres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEspacioLibre) {
        return item.id;
    }

    registerChangeInEspacioLibres() {
        this.eventSubscriber = this.eventManager.subscribe('espacioLibreListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
