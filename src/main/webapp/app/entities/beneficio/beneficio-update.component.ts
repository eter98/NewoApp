import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBeneficio } from 'app/shared/model/beneficio.model';
import { BeneficioService } from './beneficio.service';
import { IFacturacion } from 'app/shared/model/facturacion.model';
import { FacturacionService } from 'app/entities/facturacion';

@Component({
    selector: 'jhi-beneficio-update',
    templateUrl: './beneficio-update.component.html'
})
export class BeneficioUpdateComponent implements OnInit {
    beneficio: IBeneficio;
    isSaving: boolean;

    facturacions: IFacturacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected beneficioService: BeneficioService,
        protected facturacionService: FacturacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ beneficio }) => {
            this.beneficio = beneficio;
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
        if (this.beneficio.id !== undefined) {
            this.subscribeToSaveResponse(this.beneficioService.update(this.beneficio));
        } else {
            this.subscribeToSaveResponse(this.beneficioService.create(this.beneficio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficio>>) {
        result.subscribe((res: HttpResponse<IBeneficio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
