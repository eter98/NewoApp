import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';
import { AccountService } from 'app/core';
import { TarifaLandingService } from './tarifa-landing.service';

@Component({
    selector: 'jhi-tarifa-landing',
    templateUrl: './tarifa-landing.component.html'
})
export class TarifaLandingComponent implements OnInit, OnDestroy {
    tarifaLandings: ITarifaLanding[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected tarifaLandingService: TarifaLandingService,
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
            this.tarifaLandingService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ITarifaLanding[]>) => res.ok),
                    map((res: HttpResponse<ITarifaLanding[]>) => res.body)
                )
                .subscribe((res: ITarifaLanding[]) => (this.tarifaLandings = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.tarifaLandingService
            .query()
            .pipe(
                filter((res: HttpResponse<ITarifaLanding[]>) => res.ok),
                map((res: HttpResponse<ITarifaLanding[]>) => res.body)
            )
            .subscribe(
                (res: ITarifaLanding[]) => {
                    this.tarifaLandings = res;
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
        this.registerChangeInTarifaLandings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITarifaLanding) {
        return item.id;
    }

    registerChangeInTarifaLandings() {
        this.eventSubscriber = this.eventManager.subscribe('tarifaLandingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
