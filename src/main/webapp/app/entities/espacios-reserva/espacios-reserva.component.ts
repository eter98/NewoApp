import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { AccountService } from 'app/core';
import { EspaciosReservaService } from './espacios-reserva.service';

@Component({
    selector: 'jhi-espacios-reserva',
    templateUrl: './espacios-reserva.component.html'
})
export class EspaciosReservaComponent implements OnInit, OnDestroy {
    espaciosReservas: IEspaciosReserva[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected espaciosReservaService: EspaciosReservaService,
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
            this.espaciosReservaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IEspaciosReserva[]>) => res.ok),
                    map((res: HttpResponse<IEspaciosReserva[]>) => res.body)
                )
                .subscribe(
                    (res: IEspaciosReserva[]) => (this.espaciosReservas = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.espaciosReservaService
            .query()
            .pipe(
                filter((res: HttpResponse<IEspaciosReserva[]>) => res.ok),
                map((res: HttpResponse<IEspaciosReserva[]>) => res.body)
            )
            .subscribe(
                (res: IEspaciosReserva[]) => {
                    this.espaciosReservas = res;
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
        this.registerChangeInEspaciosReservas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEspaciosReserva) {
        return item.id;
    }

    registerChangeInEspaciosReservas() {
        this.eventSubscriber = this.eventManager.subscribe('espaciosReservaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
