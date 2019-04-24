import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISedes } from 'app/shared/model/sedes.model';
import { AccountService } from 'app/core';
import { SedesService } from './sedes.service';

@Component({
    selector: 'jhi-sedes',
    templateUrl: './sedes.component.html'
})
export class SedesComponent implements OnInit, OnDestroy {
    sedes: ISedes[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected sedesService: SedesService,
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
            this.sedesService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ISedes[]>) => res.ok),
                    map((res: HttpResponse<ISedes[]>) => res.body)
                )
                .subscribe((res: ISedes[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.sedesService
            .query()
            .pipe(
                filter((res: HttpResponse<ISedes[]>) => res.ok),
                map((res: HttpResponse<ISedes[]>) => res.body)
            )
            .subscribe(
                (res: ISedes[]) => {
                    this.sedes = res;
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
        this.registerChangeInSedes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISedes) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInSedes() {
        this.eventSubscriber = this.eventManager.subscribe('sedesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
