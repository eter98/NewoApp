import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';
import { CuentaAsociadaService } from './cuenta-asociada.service';
import { IFacturacion } from 'app/shared/model/facturacion.model';
import { FacturacionService } from 'app/entities/facturacion';

@Component({
    selector: 'jhi-cuenta-asociada-update',
    templateUrl: './cuenta-asociada-update.component.html'
})
export class CuentaAsociadaUpdateComponent implements OnInit {
    cuentaAsociada: ICuentaAsociada;
    isSaving: boolean;

    facturacions: IFacturacion[];
    fechaVencimientoDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cuentaAsociadaService: CuentaAsociadaService,
        protected facturacionService: FacturacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cuentaAsociada }) => {
            this.cuentaAsociada = cuentaAsociada;
        });
        this.facturacionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFacturacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFacturacion[]>) => response.body)
            )
            .subscribe((res: IFacturacion[]) => (this.facturacions = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cuentaAsociada.id !== undefined) {
            this.subscribeToSaveResponse(this.cuentaAsociadaService.update(this.cuentaAsociada));
        } else {
            this.subscribeToSaveResponse(this.cuentaAsociadaService.create(this.cuentaAsociada));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICuentaAsociada>>) {
        result.subscribe((res: HttpResponse<ICuentaAsociada>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFacturacionById(index: number, item: IFacturacion) {
        return item.id;
    }
}
