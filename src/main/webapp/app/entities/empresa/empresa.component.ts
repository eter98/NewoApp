import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmpresa } from 'app/shared/model/empresa.model';
import { AccountService } from 'app/core';
import { EmpresaService } from './empresa.service';

@Component({
    selector: 'jhi-empresa',
    templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit, OnDestroy {
    empresas: IEmpresa[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected empresaService: EmpresaService,
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
            this.empresaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IEmpresa[]>) => res.ok),
                    map((res: HttpResponse<IEmpresa[]>) => res.body)
                )
                .subscribe((res: IEmpresa[]) => (this.empresas = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.empresaService
            .query()
            .pipe(
                filter((res: HttpResponse<IEmpresa[]>) => res.ok),
                map((res: HttpResponse<IEmpresa[]>) => res.body)
            )
            .subscribe(
                (res: IEmpresa[]) => {
                    this.empresas = res;
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
        this.registerChangeInEmpresas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmpresa) {
        return item.id;
    }

    registerChangeInEmpresas() {
        this.eventSubscriber = this.eventManager.subscribe('empresaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
