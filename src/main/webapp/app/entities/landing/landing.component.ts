import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILanding } from 'app/shared/model/landing.model';
import { AccountService } from 'app/core';
import { LandingService } from './landing.service';

@Component({
    selector: 'jhi-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit, OnDestroy {
    landings: ILanding[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected landingService: LandingService,
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
            this.landingService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ILanding[]>) => res.ok),
                    map((res: HttpResponse<ILanding[]>) => res.body)
                )
                .subscribe((res: ILanding[]) => (this.landings = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.landingService
            .query()
            .pipe(
                filter((res: HttpResponse<ILanding[]>) => res.ok),
                map((res: HttpResponse<ILanding[]>) => res.body)
            )
            .subscribe(
                (res: ILanding[]) => {
                    this.landings = res;
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
        this.registerChangeInLandings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILanding) {
        return item.id;
    }

    registerChangeInLandings() {
        this.eventSubscriber = this.eventManager.subscribe('landingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
