import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInvitados } from 'app/shared/model/invitados.model';
import { AccountService } from 'app/core';
import { InvitadosService } from './invitados.service';

@Component({
    selector: 'jhi-invitados',
    templateUrl: './invitados.component.html'
})
export class InvitadosComponent implements OnInit, OnDestroy {
    invitados: IInvitados[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected invitadosService: InvitadosService,
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
            this.invitadosService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IInvitados[]>) => res.ok),
                    map((res: HttpResponse<IInvitados[]>) => res.body)
                )
                .subscribe((res: IInvitados[]) => (this.invitados = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.invitadosService
            .query()
            .pipe(
                filter((res: HttpResponse<IInvitados[]>) => res.ok),
                map((res: HttpResponse<IInvitados[]>) => res.body)
            )
            .subscribe(
                (res: IInvitados[]) => {
                    this.invitados = res;
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
        this.registerChangeInInvitados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInvitados) {
        return item.id;
    }

    registerChangeInInvitados() {
        this.eventSubscriber = this.eventManager.subscribe('invitadosListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
