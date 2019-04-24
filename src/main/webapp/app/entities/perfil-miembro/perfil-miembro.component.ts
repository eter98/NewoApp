import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';
import { AccountService } from 'app/core';
import { PerfilMiembroService } from './perfil-miembro.service';

@Component({
    selector: 'jhi-perfil-miembro',
    templateUrl: './perfil-miembro.component.html'
})
export class PerfilMiembroComponent implements OnInit, OnDestroy {
    perfilMiembros: IPerfilMiembro[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected perfilMiembroService: PerfilMiembroService,
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
            this.perfilMiembroService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IPerfilMiembro[]>) => res.ok),
                    map((res: HttpResponse<IPerfilMiembro[]>) => res.body)
                )
                .subscribe((res: IPerfilMiembro[]) => (this.perfilMiembros = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.perfilMiembroService
            .query()
            .pipe(
                filter((res: HttpResponse<IPerfilMiembro[]>) => res.ok),
                map((res: HttpResponse<IPerfilMiembro[]>) => res.body)
            )
            .subscribe(
                (res: IPerfilMiembro[]) => {
                    this.perfilMiembros = res;
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
        this.registerChangeInPerfilMiembros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerfilMiembro) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInPerfilMiembros() {
        this.eventSubscriber = this.eventManager.subscribe('perfilMiembroListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
