import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILanding } from 'app/shared/model/landing.model';
import { LandingService } from './landing.service';
import { ISedes } from 'app/shared/model/sedes.model';
import { SedesService } from 'app/entities/sedes';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas';

@Component({
    selector: 'jhi-landing-update',
    templateUrl: './landing-update.component.html'
})
export class LandingUpdateComponent implements OnInit {
    landing: ILanding;
    isSaving: boolean;

    sedes: ISedes[];

    equipoempresas: IEquipoEmpresas[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected landingService: LandingService,
        protected sedesService: SedesService,
        protected equipoEmpresasService: EquipoEmpresasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ landing }) => {
            this.landing = landing;
        });
        this.sedesService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISedes[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISedes[]>) => response.body)
            )
            .subscribe((res: ISedes[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.equipoEmpresasService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEquipoEmpresas[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEquipoEmpresas[]>) => response.body)
            )
            .subscribe((res: IEquipoEmpresas[]) => (this.equipoempresas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.landing.id !== undefined) {
            this.subscribeToSaveResponse(this.landingService.update(this.landing));
        } else {
            this.subscribeToSaveResponse(this.landingService.create(this.landing));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanding>>) {
        result.subscribe((res: HttpResponse<ILanding>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSedesById(index: number, item: ISedes) {
        return item.id;
    }

    trackEquipoEmpresasById(index: number, item: IEquipoEmpresas) {
        return item.id;
    }
}
