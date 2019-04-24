import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReservas } from 'app/shared/model/reservas.model';
import { AccountService } from 'app/core';
import { ReservasService } from './reservas.service';

@Component({
    selector: 'jhi-reservas',
    templateUrl: './reservas.component.html'
})
export class ReservasComponent implements OnInit, OnDestroy {
    reservas: IReservas[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected reservasService: ReservasService,
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
            this.reservasService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IReservas[]>) => res.ok),
                    map((res: HttpResponse<IReservas[]>) => res.body)
                )
                .subscribe((res: IReservas[]) => (this.reservas = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.reservasService
            .query()
            .pipe(
                filter((res: HttpResponse<IReservas[]>) => res.ok),
                map((res: HttpResponse<IReservas[]>) => res.body)
            )
            .subscribe(
                (res: IReservas[]) => {
                    this.reservas = res;
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
        this.registerChangeInReservas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReservas) {
        return item.id;
    }

    registerChangeInReservas() {
        this.eventSubscriber = this.eventManager.subscribe('reservasListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
